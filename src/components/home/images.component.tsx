import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../networking';
import CameraSpinner from '../camera-spinner/camera-spinner.component';
import { PublicPhotoOutputDto } from '../../interfaces/public-photo-output.interface';
import Avatar from '../avatar/avatar-component';
import { Link } from 'react-router-dom';

const ImagesHomeComponent: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<Array<PublicPhotoOutputDto>>([]);

    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<Array<PublicPhotoOutputDto>>('/public/photos/favourite')
            .then(res => {
                setImages(res.sort((a, b) => a.photo.sortOrder - b.photo.sortOrder));
            }).catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    return (
        <div className="w-full h-full columns-2 gap-4 bg-white">
            {isLoading && 
            <div className='w-full h-24 flex justify-center items-center'> 
                <CameraSpinner />
             </div>}
            {images.map(({ photo, profile }, index) => (
                <div
                    key={index}
                    style={{ backgroundImage: `url(${photo.url})` }}
                    className="relative bg-white mb-4 bg-cover bg-center break-inside-avoid h-auto"
                >
                    <img
                        // onLoad={}
                        src={photo.url} alt={`Photo ${index}`} className="w-full h-auto" />

                    <Link
                        to={`/gallery/${profile?.id}?folder=${photo.folderId}&id=${photo.id}`}
                    >
                        <div className='absolute top-0 left-0
                    flex flex-row justify-start items-center w-full'>
                            <div className='absolute bg-gray-400 l bg-opacity-45 w-full h-6' />
                            <div className='relative w-full h-full bg-opacity-90 flex justify-end items-center'>
                                <div className=''>
                                    <span className='text-black text-shadow-sm'>{profile?.name}</span>
                                </div>

                                <div className='bg-gray-400 bg-opacity-45 rounded-full p-[4px]'>
                                    <div className='hidden md:flex justify-center items-center bg-red-500 p-[2px] rounded-full'>
                                        <Avatar url={profile?.url ?? ''} size='mini' />
                                    </div>
                                    <div className='md:hidden flex justify-center items-center bg-red-500 p-[2px] rounded-full'>
                                        <Avatar url={profile?.url ?? ''} size='micro' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );

};


export default ImagesHomeComponent;