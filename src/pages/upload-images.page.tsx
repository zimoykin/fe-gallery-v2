import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/upload/header.component";
import ImagesComponent from "../components/upload/images.component";
import { IUserFolder } from "../interfaces/folder.interface";
import { ApiClient } from "../networking";
import PalitraComponent from "../components/palitra/palitra.component";
import InfoFolderComponent from "../components/upload/info.component";

const UploadImagesPage: React.FC = () => {

    const { folderId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [folder, setFolder] = useState<IUserFolder>();
    const [editMode, setEditMode] = useState<boolean>(false);

    const apiRequest = useCallback(async (isSilent?: boolean) => {
        if (folderId) {
            try {
                if (!isSilent)
                    setIsLoading(true);
                const res = await ApiClient.get<IUserFolder>(`/folders/${folderId}`);
                setFolder(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [folderId]);
    useEffect(() => {
        apiRequest();
    }, [folderId, apiRequest]);


    const handleRefreshingFolder = () => {
        //since backend has to define colors for the folder, we need to wait before request 🤔
        //TODO: find better solution
        setTimeout(() => {
            apiRequest(true);
        }, 3000);
    };

    const toogleEditMode = () => {
        setEditMode(!editMode);
    };

    return (

        <div className="
        bg-secondary-bg-75 p-2
        w-full h-full flex flex-col justify-start items-start">
            {/* header */}
            {isLoading
                ?
                <div className="w-full flex justify-center items-center">
                    <PalitraComponent size='mini' />
                </div>

                : <HeaderComponent folder={folder}
                onEditClick={toogleEditMode}

                />}
            {/* content */}
            <div className="w-full overflow-auto no-scrollbar
            flex flex-col-reverse md:flex-row
            ">
                {editMode && <InfoFolderComponent folder={folder} />}
                <ImagesComponent
                    folderId={folderId}
                    needRefreshing={handleRefreshingFolder} />

                {/* info */}
            </div>
        </ div>
    );
};

export default UploadImagesPage;
