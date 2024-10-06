import React, { useEffect, useState } from "react";
import { translate, useLocale } from "../contexts/locale";
import { IOffer } from "../interfaces/commercial.interface";
import { Link, useParams } from "react-router-dom";
import { IProfile } from "../interfaces/profile.interface";
import Avatar from "../components/avatar/avatar-component";
import CameraSpinner from "../components/camera-spinner/camera-spinner.component";
import { ApiClient } from "../networking";


const OfferPage: React.FC = () => {

    const { offerId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const { locale } = useLocale();
    const {
        only, eurPerPerson,
    } = translate[locale];

    // states
    const [offer, setOffer] = useState<IOffer>();
    const [profile, setProfile] = useState<IProfile>();

    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<IOffer>(`/public/offers/${offerId}`)
            .then((res) => {
                setOffer(res);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [offerId]);

    useEffect(() => {
        if (offer?.profileId) {
            ApiClient.get<IProfile>(`/public/profiles/${offer?.profileId}`)
                .then((res) => {
                    setProfile(res);
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    }, [offer?.profileId]);

    return (<div className="p-2 flex w-full h-full flex-col justify-start items-start bg-secondary-bg-75">

        {isLoading &&
            <div className="w-full h-full flex justify-center items-center">
                <CameraSpinner size='medium' />
            </div>
        }

        {offer &&
            <>
                <div className="w-full flex flex-row justify-start items-start">
                    {/* Profile */}
                    <Link
                        to={`/gallery/${offer?.profileId}`}
                    >
                        <div className="
                    hover:border-highlight-cl
                    rounded-md
                    flex flex-col border p-1 justify-center items-center min-w-44"
                        >
                            <Avatar url={profile?.url} size="small" />
                            <div>
                                <span className="font-bold">{profile?.name}</span>
                            </div>

                            <div className="hover:text-main-col hover:cursor-pointer hover:scale-103 transition-all ease-in-out">
                                <i className="p-1 fas fa-envelope" />
                                <span className="text-xs">{profile?.email}</span>
                            </div>
                            <div>
                                <i className="p-1 fa-solid fa-location-dot" />
                                <span className="text-xs">{profile?.location}</span>
                            </div>
                        </div>
                    </Link>
                    <div className="p-2 w-full">
                        {/* title */}
                        <div className="flex flex-row justify-start items-center w-full
                        ">
                            <div className="flex w-5/6 flex-row justify-start items-start">
                                <h1>{offer?.title}</h1>
                            </div>
                            <div className=" gap-2 flex p-1 w-1/6 flex-row justify-end items-end
                            ">
                                <div className="p-2 
                                hover:bg-highlight-bg hover:scale-110 hover:rounded-full
                                transition-all ease-in-out delay-75
                                text-yellow-500 border rounded-md">
                                    <i className="p-1 fa-solid fa-star" />
                                </div>
                                <div className="p-2 
                                hover:bg-highlight-bg hover:scale-110 hover:rounded-full
                                transition-all ease-in-out delay-75
                                text-yellow-500 border rounded-md">
                                    <i className="fa-solid fa-cart-shopping" />
                                </div>
                            </div>

                        </div>
                        <div className="p-1">
                            <p>{offer?.text}</p>
                        </div>
                        <div className="p-2 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${offer?.url})` }} />
                        <div>
                            <i className='p-1 fa-solid fa-location-dot' />
                            <span>
                                {offer?.location}
                            </span>
                        </div>
                        <div>
                            {
                                <div>
                                    <i className='p-1 fa-regular fa-calendar' />
                                    <span>{new Date().toLocaleDateString(locale)}</span>
                                    <span> - </span>
                                    <span>{
                                        new Date(offer.availableUntil).toLocaleDateString(locale)
                                    }</span>
                                </div>
                            }
                        </div>
                        <div>

                            <i className='p-1 fas fa-coins' />
                            {(offer?.category === 'hotel' || offer?.category === 'trip')
                                ? <span> {only} <span className='font-extrabold text-xl'>{offer?.price}</span> {eurPerPerson}</span>
                                : <span> <b>{offer?.price}</b>Eur</span>
                            }
                        </div>
                    </div>
                </div>

                <div className="mt-2 p-2 w-full h-full flex flex-col justify-start items-start bg-slate-200 bg-opacity-15">
                    <div>
                        <p>{offer?.text}</p>
                    </div>

                    <div
                        className="bg-no-repeat bg-center bg-cover w-full h-full"
                        style={{ backgroundImage: `url(${offer?.image})` }}
                    />
                </div>
            </>
        }
    </div>);

};

export default OfferPage;