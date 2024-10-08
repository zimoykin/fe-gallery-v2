import React from "react";
import { IPhoto, IPhotoWithImageFile } from "../interfaces/photo.interface";
import ImageCardComponent from "./image-card.component";
import { IEquipment } from "../interfaces/eqiupment.interface";

interface Props {
    images: Array<IPhoto | IPhotoWithImageFile>;
    readOnly: boolean;
    equipments?: IEquipment[];
    onLikeClick?: (id: string) => void;
    onFavoriteClick?: (id: string) => void;
    onRemoveClick?: (id: string) => void;
}

const ImageGalleryComponent: React.FC<Props> = ({ images, equipments, onLikeClick, readOnly, onFavoriteClick, onRemoveClick }) => {

    return (
        <div className="w-full h-full flex  bg-gray-600 bg-opacity-25 overflow-auto no-scrollbar">
            <div className='h-full grid grid-cols-1 place-items-center md:place-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full p-2 overflow-scroll no-scrollbar '>
                {images?.map((image, index) => (
                    <ImageCardComponent
                        key={image?.id ?? index}
                        onLikeClick={onLikeClick}
                        onFavoriteClick={onFavoriteClick}
                        onRemoveClick={onRemoveClick}
                        readOnly={readOnly}
                        image={image}
                        equipments={equipments ?? []}
                    />
                ))}
            </div>
        </div >
    );



};

export default ImageGalleryComponent;