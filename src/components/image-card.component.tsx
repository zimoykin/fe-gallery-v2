import React, { useState } from 'react';
import { IPhotoWithImageFile } from '../interfaces/photo.interface';
import { ApiClient } from '../networking';
import CameraSpinner from './camera-spinner/camera-spinner.component';
import { IEquipment } from '../interfaces/eqiupment.interface';

interface Props {
    image: IPhotoWithImageFile,
    onFavoriteClick?: (id: string) => void;
    onLikeClick?: (id: string) => void;
    readOnly?: boolean;
    onRemoveClick?: (id: string) => void;
    equipments: IEquipment[];
}


const ImageCardComponent: React.FC<Props> = ({
    image,
    onFavoriteClick, onLikeClick, onRemoveClick,
    readOnly,
    equipments
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [editMode, setEditMode] = useState<boolean>(false);

    const [id, setId] = useState<string | undefined>(image.id);
    const [likes] = useState<number>(image.likes ?? 0);
    const [url] = useState<string>(image.previewUrl ?? '');
    const [location, setLocation] = useState<string>(image.location ?? '');
    const [camera, setCamera] = useState<string>(image.camera ?? '');
    const [lens, setLens] = useState<string>(image.lens ?? '');
    const [film, setFilm] = useState<string>(image.film ?? '');
    const [iso, setIso] = useState<string>(image.iso ?? '');

    const handleUploadImage = () => {
        if (image.file) {
            const formData = new FormData();
            formData.append('file', image.file);
            //TODO: hardcoded values, not designed to be configurable
            formData.append('camera', camera);
            formData.append('lens', lens);
            formData.append('film', 'no');
            formData.append('location', location);
            formData.append('description', 'no desctiption');
            formData.append('iso', iso);
            formData.append('sortOrder', image.sortOrder?.toString() ?? '0');

            setIsLoading(true);
            ApiClient.postUpload<string>(`/photos/${image.folderId}`, formData)
                .then((id) => setId(id))
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    };

    const handleSavePhoto = () => {
        setEditMode(false);
        if (image.file) {
            handleUploadImage();
        } else {
            setIsLoading(true);
            ApiClient.put(`/photos/${image.folderId}/${image.id}`, {
                ...image,
                camera, lens, iso, film, location, description: 'no description',
            })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    };

    const handleDeleteClick = () => {
        if (id && !id.startsWith('new-')) {
            setIsLoading(true);
            ApiClient.delete(`/photos/${image.folderId}/${id}`)
                .then(() => {
                    if (onRemoveClick)
                        onRemoveClick(id);
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    };

    return (<>
        <div
            className="w-full h-full max-w-[400px] max-h-[400px] flex justify-center items-center relative bg-white shadow-md pb-12">
            {isLoading && <div className='absolute w-full h-full bg-white opacity-50 flex justify-center items-center'>
                <CameraSpinner size='mini' />
            </div>}


            {/* edit mode */}
            {editMode && <div className='absolute p-1 bottom-0 right-0 w-full h-full bg-gray-500 lg bg-opacity-85 flex justify-start items-start z-25'>
                <div className=' p-1 top-0 right-0 w-full flex flex-col z-40'>
                    {/* camera */}
                    <div className="w-full h-full md:h-auto flex flex-col justify-start items-center">
                        <label htmlFor="camera" className="block text-sm font-thin text-shadow-sm text-highlight-cl w-4/5 text-center rounded-md">
                            Camera
                        </label>
                        <select
                            id="camera"
                            value={camera}
                            onChange={(e) => setCamera(e.target.value)}
                            className="flex w-4/5 rounded-md p-1 bg-main-bg shadow-md text-xs"
                        >
                            {equipments?.filter(pred => pred.category === 'camera')?.map((e, index) => (
                                <option key={index} value={e.name}>{e.name}</option>
                            ))}
                            <option key={'no_info'} value={'no info'}>{'no info'}</option>
                        </select>
                    </div>
                    {/* lens */}
                    <div className="w-full h-full md:h-auto flex flex-col justify-start items-center">
                        <label htmlFor="lens" className="block text-xs font-thin text-shadow-sm text-highlight-cl  w-4/5 text-center rounded-md">
                            Lens
                        </label>
                        <select
                            id="lens"
                            value={lens}
                            onChange={(e) => setLens(e.target.value)}
                            className="flex w-4/5 rounded-md p-1 bg-main-bg shadow-md text-xs"
                        >
                            {equipments?.filter(pred => pred.category === 'lens')?.map((e, index) => (
                                <option key={index} value={e.name}>{e.name}</option>
                            ))}
                            <option key={'no_info'} value={'no info'}>{'no info'}</option>
                        </select>
                    </div>

                    {/* film */}
                    <div className="w-full h-full md:h-auto flex flex-col justify-start items-center">
                        <label htmlFor="film" className="block text-xs font-thin text-shadow-sm text-highlight-cl w-full md:w-4/5 text-center rounded-md">
                            Film
                        </label>
                        <input
                            value={film}
                            onChange={(e) => setFilm(e.target.value)}
                            id="film"
                            className="flex w-4/5 rounded-md p-1 bg-main-bg shadow-md text-xs"
                        />
                    </div>

                    {/* iso */}
                    <div className="w-full h-full md:h-auto flex flex-col justify-start items-center">
                        <label htmlFor="iso" className="block text-xs font-thin text-shadow-sm text-highlight-cl w-full md:w-4/5 text-center rounded-md">
                            ISO
                        </label>
                        <select
                            id="iso"
                            value={iso}
                            onChange={(e) => setIso(e.target.value)}
                            className="flex w-4/5 rounded-md p-1 bg-main-bg shadow-md text-xs"
                        >
                            {['100', '200', '400', '800', '1600', '3200', '6400', '12800', 'no info']
                                .map((e, index) => (
                                    <option key={index} value={e}>{e}</option>
                                ))}
                            <option key={'no_info'} value={'no info'}>{'no info'}</option>
                        </select>
                    </div>


                    {/* location */}
                    <div className="w-full h-full md:h-auto flex flex-col justify-start items-center">
                        <label htmlFor="lens" className="block text-xs font-thin text-shadow-sm text-highlight-cl w-full md:w-4/5 text-center rounded-md">
                            Location
                        </label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            id="lens"
                            className="flex w-4/5 rounded-md p-1 bg-main-bg shadow-md text-xs"
                        />
                    </div>
                    {/* buttons */}
                    <div className='w-full p-2 gap-2 flex flex-col justify-center items-center'>
                        <div className='flex gap-1 justify-center items-center'>
                            <button
                                className='bg-red-500 p-1 rounded-md text-white
                            hover:bg-red-600 hover:scale-105'
                                onClick={() => {
                                    setEditMode(false);
                                }}
                            >cancel</button>
                            <button
                                className='bg-primary-bg text-primary-cl p-1 rounded-md
                            hover:bg-green-600 hover:scale-105'
                                onClick={() => {
                                    handleSavePhoto();
                                }}
                            >save
                            </button>

                        </div>

                        <div>
                            <button
                                className='bg-red-700 text-primary-cl p-1 rounded-md
                            hover:bg-red-800 hover:scale-105'
                                onClick={() => {
                                    handleDeleteClick();
                                }}
                            >Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }


            <div
                style={{ backgroundImage: `url(${url})` }}
                className='w-full h-full p-2
                                flex-grow 
                                bg-no-repeat aspect-square bg-cover bg-center' />


            {/* btm-right */}
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

            {/* btm-left */}
            <div className='absolute p-1 bottom-0 left-0 gap-2 flex justify-center items-center'>
                <div className="flex justify-center items-center">
                    {!readOnly ? <div className="
                            hover:bg-gray-700 hover:bg-opacity-65 hover:rounded-full hover:scale-125
                            transition-all duration-300 ease-in-out
                            bg-opacity-40
                            bg-slate-300
                            flex flex-row justify-center items-center
                            ">

                        {(!readOnly) && <div>
                            <i className=" p-2 hover:scale-125 fas fa-pen text-red-500"
                                onClick={() => {
                                    setEditMode(!editMode);
                                }}
                            />
                        </div>}
                    </div> : null}
                </div>
            </div>
            <div className="absolute p-1 bottom-0 right-50 gap-1 flex justify-center items-center flex-col">
                <span className="text-xxs text-black font-thin leading-none">{location}</span>
                <span className="text-xxs text-black leading-none">{camera}</span>
                <span className="text-xxs text-black leading-none">{lens}</span>
            </div>
        </div>
    </>);
};


export default ImageCardComponent;