import React, { useEffect, useState } from 'react';
import PalitraComponent from '../palitra/palitra.component';
import { IUserFolder } from '../../interfaces/folder.interface';
import { ApiClient } from '../../networking';

interface Props {
    profileId: string;
}

const ContentGalleryComponent: React.FC<Props> = ({ profileId }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTopics, setIsLoadingTopics] = useState(false);
    const [folders, setFolders] = useState<IUserFolder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<IUserFolder>();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (profileId) {
            setIsLoading(true);
            ApiClient.get<IUserFolder[]>(`/public/folders/${profileId}`)
                .then((res) => {
                    setFolders(res);
                    if (res?.length > 0)
                        setSelectedFolder(res[0]);
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    }, [profileId, setFolders, setIsLoading, setSelectedFolder]);


    useEffect(() => {
        if (selectedFolder) {
    
        }
    }, [selectedFolder, folders, setImages, setIsLoadingTopics]);

    return <>
        <div className='w-full min-h-44 h-full flex flex-col md:flex-row justify-start items-start '>
            {/* left */}
            <div className='w-full md:w-1/3 '>
                {
                    !isLoading
                        ?
                        <div className='p-2 flex md:flex-col gap-2 justify-start items-start bg-secondary-bg-75
                        overflow-scroll no-scrollbar
                        '>
                            {
                                folders.map((folder, index) => (
                                    <div
                                        className={`break-words flex gap-1 w-full cursor-pointer
                                                ${selectedFolder?.id === folder.id ? 'bg-gray-400' : null}
                                            `}
                                        onClick={() => setSelectedFolder(folder)}
                                        key={index}>
                                        <div
                                            style={{ backgroundImage: `url(${folder.url})` }}
                                            className='w-16 h-16 md:w-40 md:h-40 p-1 shadow-md
                                                        bg-cover bg-center rounded-md
                                                        hover:scale-101
                                                        aspect-square flex justify-center items-center'
                                        />
                                        <span className={`p-2 text-lg 
                                            ${selectedFolder?.id === folder.id ? 'text-yellow-400' : null}
                                            hover:text-secondary-col hover:cursor-pointer`}>
                                            {folder.title}
                                        </span>
                                    </ div>
                                ))

                            }
                        </div>
                        :
                        <div className='p-1 flex w-full justify-center items-center'>
                            <PalitraComponent />
                        </div>
                }

            </div>
            {/* right */}
            {
                !isLoadingTopics
                    ?
                    <div className='flex flex-row flex-wrap md:w-2/3 p-2 gap-2'>
                        {images?.map((image, index) => (
                            <div
                                key={index}
                                style={{ backgroundImage: `url(${image})` }}
                                className='md:w-64 md:h-64 w-24 h-24
                                    flex-grow
                                    aspect-square p-1 shadow-md bg-cover bg-center rounded-md' />

                        ))}
                    </div>

                    :
                    <div className='w-full md:w-2/3 p-5'>
                        <PalitraComponent size='mini' />
                    </div>
            }

        </div>

    </>;
};
export default ContentGalleryComponent;