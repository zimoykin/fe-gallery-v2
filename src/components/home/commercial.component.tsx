import React, { useEffect, useState } from 'react';
import { ICommercial } from '../../interfaces/commercial.interface';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import { offers } from '../../mocki/offers.mock';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../contexts/locale';

const CommercialComponent: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { locale } = useLocale();

    // states
    const [ads, setAds] = useState<ICommercial[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setAds(offers);
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
                            border border-secondary-bg-75 rounded-md
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
                                        <i
                                            onClick={() => navigate('/offers/' + item.id)}
                                            className='
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

                                <span className='text-xs p-3 border border-secondary-bg rounded-md'>
                                    {item.description}
                                </span>
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
                                    {(item.category === 'hotel' || item.category === 'trip')
                                        ? <span> only <span className='font-extrabold text-xl'>{item.price}</span> Eur per person</span>
                                        : <span> <b>{item.price}</b>Eur</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))

                }
            </>
        }

    </div>;
};

export default CommercialComponent;