import React from "react";
import { IPhoto, IPhotoWithImageFile } from "../interfaces/photo.interface";

interface Props {
    images: Array<IPhoto | IPhotoWithImageFile>;
    readOnly: boolean;
    onLikeClick?: (id: string) => void;
    onFavoriteClick?: (id: string) => void;
    onRemoveClick?: (id: string) => void;
    onUploadClick?: (image: IPhotoWithImageFile, index: number) => void;
}

const ImageGalleryComponent: React.FC<Props> = ({ images, onLikeClick, readOnly, onFavoriteClick, onRemoveClick, onUploadClick }) => {

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-600 bg-opacity-25 overflow-auto no-scrollbar">
            <div className='h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full p-2 overflow-scroll no-scrollbar '>
                {images?.map(({ id, url, likes, location, camera, lens }, index) => (

                    <div
                        key={index}
                        className="w-full h-full max-w-[400px] max-h-[400px] flex justify-center items-center relative bg-white shadow-md pb-12">
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
                                {(onUploadClick && !id) && <div>
                                    <i className=" p-2 hover:scale-125 fas fa-upload text-green-500"
                                        onClick={() => onUploadClick(images[index], index)}
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
                ))}
            </div>


        </div >
    );



};

export default ImageGalleryComponent;