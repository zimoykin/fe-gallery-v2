import React from "react";
import { IPhoto, IPhotoWithImageFile } from "../interfaces/photo.interface";
import ImageCardComponent from "./image-card.component";

interface Props {
    images: Array<IPhoto | IPhotoWithImageFile>;
    readOnly: boolean;
    onLikeClick?: (id: string) => void;
    onFavoriteClick?: (id: string) => void;
    onRemoveClick?: (id: string) => void;
}

const ImageGalleryComponent: React.FC<Props> = ({ images, onLikeClick, readOnly, onFavoriteClick, onRemoveClick }) => {

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-600 bg-opacity-25 overflow-auto no-scrollbar">
            <div className='h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full p-2 overflow-scroll no-scrollbar '>
                {images?.map(({ id, url, likes, location, camera, lens }, index) => (
                    <ImageCardComponent
                        key={id ?? index}
                        id={id}
                        url={url}
                        likes={likes}
                        location={location}
                        camera={camera}
                        lens={lens}
                        onLikeClick={onLikeClick}
                        onFavoriteClick={onFavoriteClick}
                        onRemoveClick={onRemoveClick}
                        readOnly={readOnly}

                        image={images[index]}
                    />
                ))}
            </div>


        </div >
    );



};

export default ImageGalleryComponent;