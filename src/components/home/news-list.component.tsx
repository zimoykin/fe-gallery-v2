import React, { useEffect, useState } from 'react';
import { NewsMock } from '../../mocki/news.mock';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import NewsComponent from './news.component';
import { translate, useLocale } from '../../contexts/locale';

const NewsListComponent: React.FC = () => {

    const { locale } = useLocale();
    const { latestTopics } = translate[locale];

    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setNews(NewsMock);
        }, 1000);

    }, []);

    return (<div className='flex flex-col justify-start items-start w-full h-full shadow-md overflow-auto
    min-h-32
    '>

        <h1 className='font-bold text-sm bg-yellow-400 text-black w-full p-2 uppercase'> {latestTopics} </h1>

        {isLoading &&
            <div className='w-full md:h-1/4 flex justify-center items-center'>
                <CameraSpinner />
            </div>}
        {!isLoading &&
            news?.map((item, index) => (
                <NewsComponent key={index} item={item} />
            )
            )}
    </ div>);
};

export default NewsListComponent;