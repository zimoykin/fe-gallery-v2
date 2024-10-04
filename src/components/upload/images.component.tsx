import React, { useEffect, useState } from "react";
import { IPhoto, IPhotoWithImageFile } from "../../interfaces/photo.interface";
import { ApiClient } from "../../networking";
import FilesUploadComponent from "../file-upload.component";
import PalitraComponent from "../palitra/palitra.component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { translate, useLocale } from "../../contexts/locale";

interface Props {
    folderId?: string;
}

const ImagesComponent: React.FC<Props> = ({ folderId }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhotoWithImageFile[]>([]);

    const { locale } = useLocale();
    const {
        images: imagesTranslations,
    } = translate[locale];

    const { profile } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        if (!folderId) {
            return;
        }
        setIsLoading(true);
        ApiClient.get<IPhoto[]>(`/photos/${folderId}/preview`)
            .then((res) => {
                setImages(res);
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });

    }, [folderId]);


    const handleFavoriteClick = (photoId?: string) => {

        if (!photoId) {
            return;
        }

        setIsLoading(true);
        ApiClient.patch<IPhoto>(`/photos/${folderId}/${photoId}`, undefined)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });

    };

    const handleFileAdding = (files: File[]) => {
        console.log(files);
        setImages(prev => {
            return [...prev, ...files.map(file => {
                return {
                    file: file,
                    url: URL.createObjectURL(file),
                } as IPhotoWithImageFile;
            })];
        });

    };

    const handleUploadImage = (image: IPhotoWithImageFile, index: number) => {
        if (image.file && profile) {
            const formData = new FormData();
            formData.append('file', image.file);
            formData.append('camera', 'Canon EOS 6D');
            formData.append('lens', 'Canon EF 24-70mm f/2.8L II USM');
            formData.append('film', 'no');
            formData.append('location', 'Regensburg, Germany');
            formData.append('description', 'description');
            formData.append('sortOrder', index.toString());

            ApiClient.postUpload(`/photos/${folderId}`, formData)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return <>
        {/* comand panel  */}
        <div className="w-full flex justify-start items-start 
                    bg-command-panel-bg py-2 pb-3 px-2
                    shadow-md rounded-md
                    sticky top-0 z-10">

            <FilesUploadComponent
                pickedImages={handleFileAdding}
            />

            <div className="flex absolute right-0 pr-1 text-main-col font-thin text-xl">
                <i className="p-1 fas fa-image text-opacity-90 text-gray-400" />
                <span className="uppercase text-opacity-90 text-gray-400">{imagesTranslations}</span>
            </div>
        </div>
        {/* images */}
        {
            !isLoading
                ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full p-2 overflow-scroll no-scrollbar'>
                    {images?.map((image, index) => (

                        <div
                            key={index}
                            className="relative">
                            <div
                                style={{ backgroundImage: `url(${image.url})` }}
                                className='bg-no-repeat bg-center bg-cover
                                    hover:scale-102 transition-all duration-300
                                    hover:border-2 border-main-col
                                    aspect-square p-1 shadow-md rounded-md' />

                            <div className="absolute p-1 m-2 top-0 right-0 gap-2
                            hover:bg-yellow-500 hover:scale-125
                            bg-opacity-40
                            bg-slate-300">
                                {!image?.id && <i
                                    onClick={() => handleUploadImage(image, index)}
                                    className=" p-1 hover:scale-105 fas fa-upload text-primary-bg text-gray-400" />}
                                <i className=" p-1 hover:scale-105 fas fa-trash  text-red-400" />
                            </div>

                            <div className="absolute p-1 m-2 top-0 left-0 gap-2
                            hover:bg-primary-cl hover:scale-125">
                                {image?.id && <i
                                    onClick={() => handleFavoriteClick(image?.id)}
                                    className={`
                                    p-1 hover:scale-105 fas fa-star 
                                    ${image.isFavorite === true ? 'text-yellow-500' : 'text-gray-600'}`}
                                />
                                }
                            </div>
                        </div>
                    ))}
                </div>

                :
                <div className='w-full md:w-2/3 p-5'>
                    <PalitraComponent size='mini' />
                </div>
        }
    </>;
};

export default ImagesComponent;