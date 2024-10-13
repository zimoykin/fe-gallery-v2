import React, { useEffect, useState } from 'react';
import PalitraComponent from '../palitra/palitra.component';
import { IUserFolder } from '../../interfaces/folder.interface';
import { ApiClient } from '../../networking';
import { PublicPhotoOutputDto } from '../../interfaces/public-photo-output.interface';
import ImageGalleryComponent from '../image-gallery.component';
import { IPhoto } from '../../interfaces/photo.interface';
import { useSearchParams } from 'react-router-dom';

interface Props {
    profileId: string;
}

const ContentGalleryComponent: React.FC<Props> = ({ profileId }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<IUserFolder>();
    const [gradient, setGradient] = useState('');
    const [images, setImages] = useState<IPhoto[]>([]);

    useEffect(() => {
        if (profileId) {
            setIsLoading(true);
            ApiClient.get<IUserFolder[]>(`/public/folders/${profileId}`)
                .then((res) => {
                    setFolders(res);
                    if (searchParams.get('folder')) {
                        const folderId = searchParams.get('folder');
                        const folder = res.find(f => f.id === folderId);
                        if (folder) {
                            setSelectedFolder(folder);
                            return;
                        }
                    }
                    if (!selectedFolder && res?.length > 0) {
                        searchParams.set('folder', res[0].id);
                        setSearchParams(searchParams);
                        setSelectedFolder(() => res[0]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileId, setFolders,setIsLoading, setSelectedFolder]);

    useEffect(() => {
        if (selectedFolder) {
            setIsLoadingImages(true);

            const newGradient = `
            linear-gradient(to right bottom, 
            ${selectedFolder.leftTopColor ?? '#203e32'},
            ${selectedFolder.leftBottomColor ?? '#1c382a'}, 
            ${selectedFolder.centerTopColor ?? '#2b5a4e'},
            ${selectedFolder.centerBottomColor ?? '#2b5a4e'},
            ${selectedFolder.rightTopColor ?? '#cb2f3c'},
            ${selectedFolder.rightBottomColor ?? '#b00011'}
            )`;

            setGradient(newGradient);
            ApiClient.get<PublicPhotoOutputDto[]>(
                `/public/photos/${profileId}/${selectedFolder.id}`
            )
                .then((res) => {
                    setImages(res.map(({ photo }) => photo));
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoadingImages(false);
                });
        }
    }, [profileId, selectedFolder]);

    const handleLikeClick = (photoId: string) => {
        if (photoId) {
            setIsLoadingImages(true);
            ApiClient.post<string>(`/likes/${photoId}`)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoadingImages(false);
                });
        }
    };

    return (
        <>
            <div className="w-full min-h-44 h-full flex flex-col md:flex-row justify-start items-start overflow-auto no-scrollbar ">
                {/* left */}
                <div className="w-full md:w-1/5 ">
                    {!isLoading ? (
                        <div
                            className="p-2 flex md:flex-col gap-2 justify-start items-start bg-secondary-bg-75
                        overflow-scroll no-scrollbar
                        "
                        >
                            {folders?.map((folder, index) => (
                                <div
                                    className={`relative break-words flex gap-1 w-full cursor-pointer
                                                ${selectedFolder?.id === folder.id ? 'bg-gray-400' : null}
                                            `}
                                    style={{ backgroundImage: selectedFolder?.id === folder.id ? gradient : 'none' }}
                                    onClick={() => {
                                        searchParams.set('folder', folder.id);
                                        setSearchParams(searchParams);
                                        setSelectedFolder(folder);
                                    }}
                                    key={index}
                                >
                                    <div
                                        style={{ backgroundImage: `url(${folder.url})` }}
                                        className="w-24 h-24 md:w-40 md:h-40 p-1 shadow-md
                                                        bg-cover bg-no-repeat bg-center rounded-md
                                                        hover:scale-101
                                                        aspect-square
                                                        flex justify-center items-center"
                                    />
                                    <div className='absolute w-full h-full flex flex-col justify-center items-start'>
                                        <span
                                            className={`p-2 text-lg 
                                            ${selectedFolder?.id === folder.id ? 'text-yellow-400' : null}
                                            hover:text-secondary-col text-shadow-md hover:cursor-pointer`}
                                        >
                                            {folder.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-1 flex w-full justify-center items-center">
                            <PalitraComponent />
                        </div>
                    )}
                </div>
                {/* right */}
                {/* images */}
                {!isLoadingImages ? (
                    <ImageGalleryComponent
                        images={images}
                        onLikeClick={handleLikeClick}
                        readOnly
                    />
                ) : (
                    <div className="w-full md:w-2/3 p-5">
                        <PalitraComponent size="mini" />
                    </div>
                )}
            </div>
        </>
    );
};

export default ContentGalleryComponent;
