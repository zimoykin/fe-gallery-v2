import React, { useEffect, useState } from "react";
import { useUserLocation } from "../../contexts/location/location.context";
import { ApiClient } from "../../networking";
import CameraSpinner from "../camera-spinner/camera-spinner.component";
import { IOffer } from "../../interfaces/commercial.interface";
import { translate, useLocale } from "../../contexts/locale";
import Avatar from "../avatar/avatar-component";

const ForYouWidgetComponent: React.FC = () => {

    const { location } = useUserLocation();
    const { locale } = useLocale();
    const { nearYou } = translate[locale];
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [offers, setOffers] = useState<IOffer[]>([]);

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            setIsLoading(true);
            ApiClient.get<IOffer[]>('public/offers/coordinates', {
                latitude: location.latitude.toString(),
                longitude: location.longitude.toString(),
                radius: '100',
            })
                .then((res) => {
                    setOffers(res);
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    }, [location?.latitude, location?.longitude]);


    return (<>
        <div className="w-full bg-yellow-500 p-2 border-b border-black">
            <p className="text-sm text-black font-bold uppercase ">{nearYou}</p>
        </div>
        {isLoading ? <div className="w-full h-full flex items-center justify-center">
            <CameraSpinner size="mini" />
        </div>
            :
            <>
                {offers.map((offer) => (
                    <div
                        className="bg-yellow-500 w-full p-0 relative"
                        key={offer.id}>
                        <div
                            style={{ backgroundImage: `url(${offer.previewUrl})` }}
                            className="aspect-square
                            border-8 border-white inline-flex justify-center items-center w-full h-full bg-cover bg-center" />

                        <div className="absolute top-5 p-1 bg-slate-500 bg-opacity-70">
                            <p className="text-sm font-bold text-black">{offer.title}</p>
                        </div>

                        <div className="absolute p-2 left-0 bottom-0 w-full flex flex-row
                        items-center
                        bg-red-600 bg-opacity-50">
                            <div className="flex flex-row w-1/2">
                                <div className="text-sm stroke-1 font-bold text-black">
                                    PRICE: {(offer.price ?? 0) - ((offer.price ?? 0) * (offer.discount ?? 0)) / 100}
                                    <i className="p-1 fa-solid fa-euro text-shadow-sm" />

                                    {(offer?.discount && offer?.discount > 0) ?
                                        <div className="flex flex-row justify-start items-center w-full">
                                            <p className="text-xxs">inc. discount: {offer.discount}</p>
                                            <i className="p-1 text-xxs fa-solid fa-percentage text-shadow-sm" />
                                        </div>
                                        : null
                                    }
                                </div>

                            </div>

                            <div className="w-1/2 flex justify-end">
                                <Avatar size="micro" url={offer.profile?.url} />
                            </div>
                        </div>
                    </div>
                ))}
            </>
        }
    </>);
};


export default ForYouWidgetComponent;