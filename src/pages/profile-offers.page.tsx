import React, { useEffect, useState } from 'react';
import { IOffer } from '../interfaces/commercial.interface';
import { ApiClient } from '../networking';
import CameraSpinner from '../components/camera-spinner/camera-spinner.component';
import OfferComponent from '../components/profile/offer.component';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const newOffer = (
    profileId: string,
    id: string,
) => ({
    id: id,
    title: '',
    price: 0,
    profileId: profileId,
    availableUntil: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
    previewUrl: 'https://picsum.photos/id/27/400/300',
    compressedUrl: ''
});


const ProfileOffersPage: React.FC = () => {

    const [offers, setOffers] = useState<IOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState<string[]>([]);
    const { profile } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        ApiClient.get<IOffer[]>('/offers')
            .then((res) => {
                setOffers(res);
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });


        ApiClient.get<string[]>('/settings/offer-categories')
            .then((res) => {
                setCategory(res);
            })
            .catch(console.error);
    }, []);

    const handleAddOffer = () => {
        setOffers(off => {
            return [
                ...off,
                newOffer(profile?.id ?? '', 'new-' + off.length),
            ];
        });
    };

    const handleDeleteOffer = (offer: IOffer) => () => {
        setOffers(off => off.filter(o => o.id !== offer.id));
    };

    return (
        <div className='flex w-full h-full flex-col'>
            <div className='w-full  grid grid-cols-2 md:grid-cols-3 gap-2'>
                {isLoading ? <CameraSpinner /> :
                    offers?.map((offer, index) => (
                        <OfferComponent
                            offer={offer}
                            categoryOptions={category}
                            key={offer.id ?? index}
                            onDelete={handleDeleteOffer(offer)}
                        />
                    ))
                }

                <div className='flex h-full min-h-48 w-full 
                justify-center items-center 
                bg-gradient-to-br 
                from-main-bg 
                via-highlight-cl
                to-gray-700
                '>
                    <div className='
                    flex flex-col justify-center items-center gap-1
                    hover:scale-110 hover:cursor-pointer
                    transition-all duration-300 ease-in-out del§ay-75
                    '>
                        <p className='text-white text-shadow-sm'>Add new</p>                        
                        <i
                            onClick={handleAddOffer}
                            className='fas fa-plus border-2 p-2 text-white text-shadow-sm' />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOffersPage;