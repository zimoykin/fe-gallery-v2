import React, { useState } from "react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Circle } from "../../maps/circle.component";
import { IProfile } from "../../interfaces/profile.interface";

interface Props {
    profile: IProfile | null;
    resolveAddressByCoordinates: (lat: number, lng: number) => void;
}

const LocationComponent: React.FC<Props> = ({ profile, resolveAddressByCoordinates }) => {

    const [centerSelected, setCenterSelected] = useState<boolean>(false);
    const resolveNewAddress = (e: google.maps.LatLngLiteral | null) => {
        if (e?.lat && e?.lng) {
            resolveAddressByCoordinates(e.lat, e.lng);
            setCenterSelected(true);
        }
    };

    return (<>

        <Map
            onDragstart={() => setCenterSelected(false)}
            onClick={(e) => resolveNewAddress(e.detail.latLng)}
            mapId={'profile-map'}
            center={centerSelected ? {
                lat: profile?.location?.lat ?? 46.227638,
                lng: profile?.location?.long ?? 12.567381
            } : null}
            defaultZoom={8}
            defaultCenter={{ lat: profile?.location?.lat ?? 46.227638, lng: profile?.location?.long ?? 12.567381 }}>
            <AdvancedMarker
                position={{
                    lat: profile?.location?.lat ?? 46.227638,
                    lng: profile?.location?.long ?? 12.567381
                }}
            >
                <Circle
                    fillColor={'#FF0000'}
                    strokeWeight={1}
                    radius={(profile?.location?.distance ?? 25) * 1000}
                    center={{
                        lat: profile?.location?.lat ?? 46.227638,
                        lng: profile?.location?.long ?? 12.567381
                    }}
                />
            </AdvancedMarker>

        </Map>

    </>);
};

export default LocationComponent;