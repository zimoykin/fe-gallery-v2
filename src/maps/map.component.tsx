import { Map, AdvancedMarker, ColorScheme } from "@vis.gl/react-google-maps";
import React, { Fragment, useEffect, useState } from "react";
import Avatar from "../components/avatar/avatar-component";
import { Circle } from "./circle.component";
import { useTheme } from "../contexts/theme/theme-context";
import { IProfile } from "../interfaces/profile.interface";


interface Props {
    hoveredProfile: string | null;
    filteredProfiles: IProfile[];
    selectedProfile: IProfile | null;
    radius: number;
    onDragstart: () => void;
}

const MapComponent: React.FC<Props> = ({ radius, hoveredProfile, filteredProfiles, selectedProfile, onDragstart }) => {

    const { theme } = useTheme();
    const [center, setCenter] = useState<{ lat: number; lng: number; } | null>(null);
    const [centerOfMap, setCenterOfMap] = useState<{ lat: number; lng: number; } | null>(null);
    const [zoom, setZoom] = useState<number | null>(null);
    //
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);

    useEffect(() => {
        const earthRadiusInKm = 6371;
        const circumferenceInKm = 2 * Math.PI * earthRadiusInKm;
        const pixelsPerKm = 256 / circumferenceInKm;
        const circleDiameterInPixels = radius * 2 * pixelsPerKm;
        const zoomLevel = Math.log2(256 / circleDiameterInPixels);

        setZoom(
            (1 + Math.floor(zoomLevel * 100) / 100)
        );

    }, [radius]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const location = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
            setUserLocation(location);
            setCenter(location);
            setCenterOfMap(location);
        }, console.error);
    }, []);


    useEffect(() => {
        if (selectedProfile?.location?.lat && selectedProfile?.location?.long) {
            setCenter({
                lat: selectedProfile.location.lat,
                lng: selectedProfile.location.long,
            });
        }
        else {
            setCenter(null);
        }
    }, [selectedProfile]);

    return (
        <Map
            mapId={'gallery-map'}
            defaultZoom={zoom ? zoom : 5}
            zoom={zoom}
            defaultCenter={userLocation ? userLocation : { lat: 46.227638, lng: 12.567381 }}
            center={(center?.lat && center.lng) ? { lat: center.lat, lng: center.lng } : null}
            streetViewControl={false}
            onZoomChanged={() => {
                setZoom(null);
            }}
            onDragstart={() => {
                onDragstart();
                setCenter(null);
                setZoom(null);
            }
            }
            colorScheme={
                theme === 'dark'
                    ? ColorScheme.DARK
                    : theme === 'light'
                        ? ColorScheme.LIGHT
                        : ColorScheme.FOLLOW_SYSTEM
            }
        >
            {filteredProfiles
                .filter((profile) => profile.location && profile.location.lat && profile.location.long)
                .map((profile, i) => (
                    <Fragment key={profile.id ?? i}>
                        <AdvancedMarker
                            position={{
                                lat: profile.location!.lat,
                                lng: profile.location!.long,
                            }}
                        >
                            <div className='flex shadow-md'>
                                <Avatar url={profile.url} size={(profile.id === hoveredProfile || profile.id === selectedProfile?.id) ? 'mini' : 'micro'} />
                            </div>
                            <Circle
                                onClick={() => {
                                    setCenter({
                                        lat: profile.location!.lat,
                                        lng: profile.location!.long,
                                    });
                                }}
                                center={{
                                    lat: profile.location!.lat,
                                    lng: profile.location!.long,
                                }}
                                radius={(profile.location?.distance ?? 15) * 1000}
                                fillColor={profile.id === hoveredProfile ? 'red' : 'green'}
                                strokeWeight={0}
                            />
                        </AdvancedMarker>
                    </Fragment>
                ))}

            <Circle center={centerOfMap} radius={radius * 1000} strokeWeight={0} fillColor={'rgba(133,123,0,0.5)'} />
        </Map>
    );
};

export default MapComponent;