import React, { useEffect, useState } from 'react';
import { ICommercial } from '../../interfaces/commercial.interface';
import CameraSpinner from '../camera-spinner/camera-spinner.component';

const CommercialComponent: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // states
    const [ads, setAds] = useState<ICommercial[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setAds([
                {
                    id: '1',
                    title: 'Would you like to see the best photo and gastro trip in Spain?',
                    location: 'Sevilla, Malaga, Ronda and Marbello',
                    description: 'Our tour: Hiking in the Pyrenees 10.9km, yachting, gastronomy, wine tasting, 3 beautiful beaches, 7 nights in a 5 star hotel, free breakfast, all flying tickets included',
                    price: 300,
                    image: 'spain-ads.png',
                    category: 'trip',
                    profileId: '2',
                    url: 'https://www.google.com'

                },
                {
                    id: '2',
                    title: 'Italian city tour with Guide',
                    location: 'Rome, Naples, Milan and Venice',
                    description: 'Bust tour: we will visit the city of Rome, free breakfast, all flying tickets included',
                    price: 200,
                    image: 'https://picsum.photos/id/16/400/300',
                    category: 'trip',
                    profileId: '4',
                    url: 'https://www.google.com'
                }, {
                    id: '3',
                    title: 'Canon EOS 90D DSLR',
                    location: 'Regensburg, Germany',
                    description: 'Canon EOS 90D DSLR, in perfect condition, like new. Will be shipped to you in 5 days.',
                    price: 750,
                    image: 'https://picsum.photos/id/77/400/300',
                    category: 'camera',
                    profileId: '1',
                    url: 'https://www.google.com'
                }
            ]);


        }, Math.random() * 1000);
    }, []);


    return <div className='w-full'>
        {isLoading &&
            <div className='p-2 flex w-full justify-center items-center'>
                <CameraSpinner />
            </div>
        }


        {!isLoading &&
            <>
                {
                    ads.map((item, index) => (
                        <div
                            className='p-1 w-full flex flex-row justify-start items-start
                            hover:bg-secondary-bg transition-colors delay-75 ease-in-out
                            '
                            key={index}>
                            <div className='p-3 bg-gray-600 w-1/4 min-h-40 bg-no-repeat bg-cover'
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className='p-1 w-full flex justify-start items-start flex-col'>
                                <div className='p-1 w-full flex justify-start items-start'>
                                    <div className='p-1 w-5/6 flex justify-start items-start'>
                                        <h1 className='text-3xl font-bold text-left text-highlight-cl text-shadow-sm'>
                                            {item.title}
                                        </h1>
                                    </div>
                                    <div className='p-1 h-full w-1/6 flex justify-end items-start'>
                                        <i className='
                                        hover:text-main-col hover:cursor-pointer hover:scale-105
                                        font-bold text-right text-highlight-cl text-shadow-sm fa-solid fa-link' />
                                    </div>
                                </div>
                                <div>
                                    <i className='p-1 fa-solid fa-location-dot' />
                                    <span>
                                        {item.location}
                                    </span>
                                </div>

                                <span>
                                    {item.description}
                                </span>
                                <span> only <b>{item.price}</b>Eur per person</span>
                            </div>
                        </div>
                    ))

                }
            </>
        }

    </div>;
};

export default CommercialComponent;