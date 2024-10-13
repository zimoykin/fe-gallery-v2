import React, { useEffect, useState } from "react";
import { IPhoto, IPhotoWithImageFile } from "../interfaces/photo.interface";
import ImageCardComponent from "./image-card.component";
import { IEquipment } from "../interfaces/eqiupment.interface";
import { useSearchParams } from "react-router-dom";

interface Props {
    images: Array<IPhoto | IPhotoWithImageFile>;
    readOnly: boolean;
    equipments?: IEquipment[];
    onLikeClick?: (id: string) => void;
    onFavoriteClick?: (id: string) => void;
    onRemoveClick?: (id: string) => void;
}

const ImageGalleryComponent: React.FC<Props> = ({ images, equipments, onLikeClick, readOnly, onFavoriteClick, onRemoveClick }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedImages, setSelectedImages] = useState<IPhoto | null>();

    useEffect(() => {
        if (searchParams.get('id')) {
            const id = searchParams.get('id');
            const image = images.find(i => i._id === id);
            if (image) {
                setSelectedImages(image as IPhoto);
                return;
            }
        }
    }, [images, searchParams, setSelectedImages]);

    return (
        <div className="w-full h-full flex  bg-gray-600 bg-opacity-25 overflow-auto no-scrollbar">
            <div className='h-full grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full p-2 overflow-scroll no-scrollbar '>
                {images?.map((image, index) => (
                    <ImageCardComponent
                        key={image?._id ?? index}
                        onLikeClick={onLikeClick}
                        onFavoriteClick={onFavoriteClick}
                        onRemoveClick={onRemoveClick}
                        readOnly={readOnly}
                        image={image}
                        equipments={equipments ?? []}
                    />
                ))}
            </div>
            {/* modal view */}
            {selectedImages && <div className="absolute top-0 left-0 z-20
                        transition-all duration-300 delay-75
                        w-full h-full bg-black bg-opacity-45">
                <div className="absolute top-0 left-0 grid place-items-center w-full h-full">
                    <img
                        onClick={() => {
                            setSelectedImages(null);
                            searchParams.delete('id');
                            setSearchParams(searchParams);
                        }}
                        src={selectedImages?.compressedUrl ?? ''}
                        alt="Selected"
                        className="max-w-screen max-h-screen object-contain bg-no-repeat"
                    />
                </div>
            </div>}


        </div >
    );



};

export default ImageGalleryComponent;