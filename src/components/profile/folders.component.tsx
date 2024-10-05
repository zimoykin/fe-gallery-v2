import React, { useEffect, useState } from "react";
import { IFolder } from "../../interfaces/folder.interface";
import { translate, useLocale } from "../../contexts/locale";
import CameraSpinner from "../camera-spinner/camera-spinner.component";
import { ApiClient } from "../../networking";
import { FolderWithState } from "./types/folder-with-state.type";
import FolderComponent from "./folder.component";

const FoldersComponent: React.FC = () => {
    const [folders, setFolders] = useState<FolderWithState[]>([]);

    const { locale } = useLocale();
    const { foldersTitle } = translate[locale];

    const [isLoadingFolders, setIsLoadingFolders] = useState<boolean>(false);

    useEffect(() => {
        setIsLoadingFolders(true);
        ApiClient.get<IFolder[]>(`/folders`)
            .then((res) => {
                setFolders(res.map((folder) => {
                    return {
                        ...folder,
                        isEdit: false
                    };
                }));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoadingFolders(false);
            });

    }, []);


    const handleAddClick = () => {
        setFolders((fold) => {
            return [...fold, {
                title: 'New Folder ' + (fold.length + 1),
                description: 'Save your photos in folders',
                privateAccess: 0,
                sortOrder: fold.length + 1,
                url: '',
                favoriteFotoId: '',
                isEdit: true,
                id: 'new-' + folders.length.toString()
            }];
        });
    };

    return (
        <div className="flex flex-col w-full p-3">
            {/* comand panel  */}
            <div className="flex justify-start items-start bg-command-panel-bg pt-2 pr-3 pb-3 pl-3 sticky top-0 z-10">
                <i className="p-1 fa-solid fa-plus hover:bg-main-bg hover:scale-125 border transition ease-in-out delay-75"
                    onClick={handleAddClick}
                />
                <div className="flex absolute right-0 pr-1 text-main-col font-thin text-xl">
                    <i className="p-1 fas fa-folder text-opacity-90 text-gray-400" />
                    <span className="uppercase text-opacity-90 text-gray-400">{foldersTitle}</span>
                </div>
            </div>

            {isLoadingFolders && <div className='hidden w-full md:flex bg-black bg-opacity-60 justify-center items-center md:h-full absolute top-0 left-0' >
                <CameraSpinner size='large' />
            </div>}
            {/* table */}
            <table className="w-full h-full">
                <tbody>
                    {
                        folders?.map((folder, index) => (
                            <FolderComponent
                                onDeleteClick={() => {
                                    setFolders((prevFolders) => {
                                        const newFolders = prevFolders.filter(({ id }) => id !== folder.id);
                                        return newFolders;
                                    });
                                }}
                                index={index}
                                key={folder.id}
                                folder={folder}
                            />
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
};

export default FoldersComponent;