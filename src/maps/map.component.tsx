import { Map, AdvancedMarker, ColorScheme, MapMouseEvent } from "@vis.gl/react-google-maps";
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
    userLocation: { lat: number; lng: number; } | null;
    onDragstart: () => void;
    userLocationChanged: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<Props> = ({
    radius, hoveredProfile, filteredProfiles, selectedProfile, userLocation,
    onDragstart,
    userLocationChanged
}) => {

    const { theme } = useTheme();
    const [center, setCenter] = useState<{ lat: number; lng: number; } | null>(userLocation);
    const [centerOfMap, setCenterOfMap] = useState<{ lat: number; lng: number; } | null>(userLocation);
    const [zoom, setZoom] = useState<number | null>(null);

    // useEffect(() => {
    //     const earthRadiusInKm = 6371;
    //     const circumferenceInKm = 2 * Math.PI * earthRadiusInKm;
    //     const pixelsPerKm = 256 / circumferenceInKm;
    //     const circleDiameterInPixels = radius * 2 * pixelsPerKm;
    //     const zoomLevel = Math.log2(256 / circleDiameterInPixels);

    //     setZoom(
    //         (1 + Math.floor(zoomLevel * 100) / 100)
    //     );

    // }, [radius]);

    useEffect(() => {
        setCenterOfMap(center);
    }, [center]);

    useEffect(() => {
        if (!centerOfMap) {
            setCenterOfMap(userLocation);
        }
    }, [userLocation, setCenterOfMap, centerOfMap]);

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


    const handleClickOnMap = (e: MapMouseEvent) => {
        if (e.detail.latLng) {
            const coord = e.detail.latLng;
            userLocationChanged(coord.lat, coord.lng);
            setCenterOfMap(coord);
        }
    };


    return (
        <Map
            mapId={'gallery-map'}
            defaultZoom={zoom ? zoom : 9}
            zoom={zoom}
            defaultCenter={userLocation ? userLocation : undefined}
            center={(center?.lat && center.lng) ? { lat: center.lat, lng: center.lng } : null}
            streetViewControl={false}
            onClick={e => handleClickOnMap(e)}
            onZoomChanged={() => {
                setZoom(null);
            }}
            onDragstart={() => {
                onDragstart();
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
                                clickable={false}
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

            <Circle
                // onClick={e => handleClickOnMap(e.latLng)}
                clickable={false}
                center={centerOfMap}
                radius={radius * 1000}
                strokeWeight={0}
                fillColor={'rgba(133,123,0,0.5)'} />
        </Map>
    );
};

export default MapComponent;