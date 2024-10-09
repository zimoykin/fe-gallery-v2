import React, { useEffect, useState } from 'react';
import { ApiClient } from '../../networking';
import { PublicPhotoOutputDto } from '../../interfaces/public-photo-output.interface';
import ImageHomeComponent from './image.component';

const ImagesHomeComponent: React.FC = () => {
    const [images, setImages] = useState<Array<PublicPhotoOutputDto>>([]);

    useEffect(() => {
        ApiClient.get<Array<PublicPhotoOutputDto>>('/public/photos/favourite')
            .then(res => {
                setImages(res);
            }).catch(console.error);
    }, []);

    return (
        <>
            <div className="w-full h-full columns-2 gap-4 bg-white">
                {images.map(({ photo, profile }, index) => (
                    <ImageHomeComponent key={index} photo={photo} profile={profile} />
                ))}
            </div>
        </>
    );

};


export default ImagesHomeComponent;;