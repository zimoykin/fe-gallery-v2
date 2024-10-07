import React, { useState } from 'react';
import { IPhotoWithImageFile } from '../interfaces/photo.interface';
import { ApiClient } from '../networking';
import CameraSpinner from './camera-spinner/camera-spinner.component';

interface Props {
    id?: string, url?: string, likes?: number, location?: string, camera?: string, lens?: string,
    image: IPhotoWithImageFile,
    onFavoriteClick?: (id: string) => void;
    onLikeClick?: (id: string) => void;
    readOnly?: boolean;
    onRemoveClick?: (id: string) => void;
}


const ImageCardComponent: React.FC<Props> = ({
    id, url, likes, location, camera, lens, image,
    onFavoriteClick, onLikeClick, onRemoveClick,
    readOnly
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleUploadImage = () => {
        if (image.file) {
            const formData = new FormData();
            formData.append('file', image.file);
            //todo: hardcoded values
            formData.append('camera', 'Canon EOS 6D');
            formData.append('lens', 'Canon EF 24-70mm f/2.8L II USM');
            formData.append('film', 'no');
            formData.append('location', 'Regensburg, Germany');
            formData.append('description', 'description');
            formData.append('sortOrder', image.sortOrder?.toString() ?? '0');

            setIsLoading(true);
            ApiClient.postUpload<string>(`/photos/${image.folderId}`, formData)
                .then((res) => {
                    console.log(res);
                    image.id = res;
                })
                .catch((err) => {
                    console.error(err);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    };

    return (<>
        <div
            className="w-full h-full max-w-[400px] max-h-[400px] flex justify-center items-center relative bg-white shadow-md pb-12">
            {isLoading && <CameraSpinner size='mini' />}
            <div
                style={{ backgroundImage: `url(${url})` }}
                className='w-full h-full p-2
                                flex-grow 
                                bg-no-repeat aspect-square bg-cover bg-center' />


            {/* top-right */}
            {onFavoriteClick ? <div className="absolute p-1 bottom-0 right-0 gap-1 flex justify-center items-center">
                <div className="hover:bg-gray-700 hover:bg-opacity-65 hover:rounded-full hover:scale-125
                            transition-all duration-300 ease-in-out
                            bg-opacity-40
                            bg-slate-300
                            p-1">
                    <i className="p-1 hover:scale-125 fas fa-star text-yellow-500"
                        onClick={() => {
                            if (onFavoriteClick && id) {
                                onFavoriteClick(id);
                            }
                        }}
                    />
                </div>
            </div>
                :
                <div className="absolute p-1 bottom-0 right-0 gap-1 flex justify-center items-center"
                    onClick={() => {
                        if (onLikeClick && id) {
                            onLikeClick(id);
                        }
                    }}
                >
                    <span className="text-yellow-900">{likes ?? 0}</span>
                    <div className="hover:bg-gray-700 hover:bg-opacity-65 hover:rounded-full hover:scale-125
                            transition-all duration-300 ease-in-out
                            bg-opacity-40
                            bg-slate-300
                            p-1
                            ">
                        <i className="p-1 hover:scale-125 fas fa-heart  text-yellow-500" />

                    </div>
                </div>

            }

            {/* top-left */}
            <div className="absolute p-1 bottom-0 left-0 gap-2 flex  justify-center items-center">
                {!readOnly ? <div className="
                            hover:bg-gray-700 hover:bg-opacity-65 hover:rounded-full hover:scale-125
                            transition-all duration-300 ease-in-out
                            bg-opacity-40
                            bg-slate-300
                            flex flex-row justify-center items-center
                            ">

                    {onRemoveClick && <div>
                        <i className=" p-2 hover:scale-125 fas fa-trash text-red-500"
                            onClick={() => { if (id) onRemoveClick(id); }}
                        />
                    </div>}
                    {(!readOnly && !id) && <div>
                        <i className=" p-2 hover:scale-125 fas fa-upload text-green-500"
                            onClick={() => handleUploadImage()}
                        />
                    </div>
                    }
                </div> : null}
            </div>
            <div className="absolute p-1 bottom-0 right-50 gap-1 flex justify-center items-center flex-col">
                <span className="text-xxs font-thin leading-none">{location}</span>
                <span className="text-xxs leading-none">{camera}</span>
                <span className="text-xxs leading-none">{lens}</span>
            </div>
        </div>
    </>);
};


export default ImageCardComponent;