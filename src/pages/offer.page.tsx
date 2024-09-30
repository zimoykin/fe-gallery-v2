import React, { useEffect, useState } from "react";
import { translate, useLocale } from "../contexts/locale";
import { offers } from "../mocki/offers.mock";
import { ICommercial } from "../interfaces/commercial.interface";
import { useParams } from "react-router-dom";
import { IProfile } from "../interfaces/profile.interface";
import { MockUsers } from "../mocki/users.mock";
import Avatar from "../components/avatar/avatar-component";


const OfferPage: React.FC = () => {

    const { offerId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const { locale } = useLocale();
    const {
        ourOffers
    } = translate[locale];


    // states
    const [offer, setOffer] = useState<ICommercial>();
    const [profile, setProfile] = useState<IProfile>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        //TODO: implement api call instead of fake request
        setIsLoading(true);
        setTimeout(() => {
            const offer = offers.find((offer) => offer.id === offerId);
            if (offer) {
                setOffer(offer);
            }
            else {
                //setError('Offer not found');
            }
            setIsLoading(false);
        }, 1500 * Math.random());
    }, [offerId]);

    useEffect(() => {
        if (offer?.profileId) {
            setTimeout(() => {
                MockUsers.find((user) => user.id === offer?.profileId) && setProfile(MockUsers.find((user) => user.id === offer?.profileId));
            }, 1300 * Math.random());
        }
    }, [offer?.profileId]);

    return (<div className="p-2 flex w-full h-full flex-col justify-start items-start bg-secondary-bg-75">

        <div className="w-full flex flex-row justify-start items-start">
            <div className="flex flex-col border p-1 justify-center items-center min-w-44">
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
            <div className="p-2">
                <h1>{offer?.title}</h1>
                <div>
                    <p>{offer?.description}</p>
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
                            {/* fake offer duration */}
                            <span>{
                                new Date(new Date().setDate(new Date().getDate() + 10 * Math.random())).toLocaleDateString(locale)
                            }</span>
                        </div>
                    }
                </div>
                <div>

                    <i className='p-1 fas fa-coins' />
                    {(offer?.category === 'hotel' || offer?.category === 'trip')
                        ? <span> only <span className='font-extrabold text-xl'>{offer?.price}</span> Eur per person</span>
                        : <span> <b>{offer?.price}</b>Eur</span>
                    }
                </div>
            </div>
        </div>
        <div className="mt-2 p-2 w-full h-full flex flex-col justify-start items-start bg-slate-200 bg-opacity-15">
            <div
                className="bg-no-repeat bg-cover w-full h-full"
                style={{ backgroundImage: `url(${offer?.image})` }}
            />
        </div>
    </div>);

};

export default OfferPage;