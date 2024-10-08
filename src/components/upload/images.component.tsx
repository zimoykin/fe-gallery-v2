import React, { useEffect, useState } from "react";
import { IPhoto, IPhotoWithImageFile } from "../../interfaces/photo.interface";
import { ApiClient } from "../../networking";
import FilesUploadComponent from "../file-upload.component";
import PalitraComponent from "../palitra/palitra.component";
import { translate, useLocale } from "../../contexts/locale";
import ImageGalleryComponent from "../image-gallery.component";

interface Props {
    folderId?: string;
    needRefreshing?: () => void;
}

const ImagesComponent: React.FC<Props> = ({ folderId, needRefreshing }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<IPhotoWithImageFile[]>([]);

    const { locale } = useLocale();
    const {
        images: imagesTranslations,
    } = translate[locale];

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
                if (needRefreshing)
                    needRefreshing();
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
                    folderId: folderId,
                    sortOrder: prev.length,
                    file: file,
                    url: URL.createObjectURL(file),
                } as IPhotoWithImageFile;
            })];
        });

    };

    const handleRemoveClick = (photoId: string) => {
        setIsLoading(true);
        ApiClient.delete<IPhoto>(`/photos/${folderId}/${photoId}`)
            .then((res) => {
                console.log(res);
                setImages(prev => prev.filter(photo => photo.id !== photoId));
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    return <div className="w-full h-full flex flex-col justify-start items-start">
        {/* comand panel  */}
        <div className="w-full flex justify-start items-start 
                    bg-highlight-bg p-1
                    shadow-md rounded-md
                    sticky top-0 z-10
                    ">

            <FilesUploadComponent
                pickedImages={handleFileAdding}
            />

            <div className="flex h-full absolute right-0 text-main-col font-thin justify-center items-center gap-2 pr-2">
                <i className="fas fa-image text-opacity-90 text-highlight-cl" />
                <span className="uppercase text-opacity-90 text-highlight-cl">{imagesTranslations}</span>
            </div>
        </div>
        {/* images */}
        {
            !isLoading
                ?
                <ImageGalleryComponent
                    images={images}
                    onFavoriteClick={(id) => handleFavoriteClick(id)}
                    onRemoveClick={(id) => handleRemoveClick(id)}
                    readOnly={false}
                />
                :
                <div className='w-full md:w-2/3'>
                    <PalitraComponent size='mini' />
                </div>
        }
    </ div>;
};

export default ImagesComponent;