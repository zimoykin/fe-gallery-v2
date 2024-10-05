import React, { useEffect, useState } from "react";
import { IPhoto, IPhotoWithImageFile } from "../../interfaces/photo.interface";
import { ApiClient } from "../../networking";
import FilesUploadComponent from "../file-upload.component";
import PalitraComponent from "../palitra/palitra.component";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { translate, useLocale } from "../../contexts/locale";
import ImageGalleryComponent from "../image-gallery.component";

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

    const handleUploadImage = (image: IPhotoWithImageFile, index: number) => {
        if (image.file && profile) {
            const formData = new FormData();
            formData.append('file', image.file);
            //todo: hardcoded values
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
                    sticky top-0 z-0
                    ">

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
                <ImageGalleryComponent
                    images={images}
                    onFavoriteClick={(id) => handleFavoriteClick(id)}
                    onRemoveClick={(id) => handleRemoveClick(id)}
                    onUploadClick={(image, index) => handleUploadImage(image, index)}
                    readOnly={false}
                />
                :
                <div className='w-full md:w-2/3 p-5'>
                    <PalitraComponent size='mini' />
                </div>
        }
    </>;
};

export default ImagesComponent;