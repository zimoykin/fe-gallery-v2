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
    onDragstart: () => void;
}

const MapComponent: React.FC<Props> = ({ hoveredProfile, filteredProfiles, selectedProfile, onDragstart }) => {


    const { theme } = useTheme();
    const [center, setCenter] = useState<{ lat: number; lng: number; } | null>(null);
    //
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const location = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
            setUserLocation(location);
            setCenter(location);
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
            defaultZoom={9}
            defaultCenter={userLocation ? userLocation : { lat: 46.227638, lng: 12.567381 }}
            center={(center?.lat && center.lng) ? { lat: center.lat, lng: center.lng } : null}
            streetViewControl={false}
            onDragstart={() => {
                onDragstart();
                setCenter(null);
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
        </Map>
    );
};

export default MapComponent;