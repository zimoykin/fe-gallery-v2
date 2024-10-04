import React, { useEffect, useState } from "react";
import { IUserFolder } from "../../interfaces/folder.interface";
import { ApiClient } from "../../networking";
import PalitraComponent from "../palitra/palitra.component";


interface Props {
    folderId?: string;
}

const HeaderComponent: React.FC<Props> = ({ folderId }) => {

    const [folder, setFolder] = useState<IUserFolder>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<IUserFolder>(`/folders/${folderId}`)
            .then((res) => {
                setFolder(res);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [folderId]);

    return (
        <>
            {isLoading ?
                <div className="w-full flex justify-center items-center">
                    <PalitraComponent size='medium' />
                </div>
                :
                <div className={`w-full h-1/6 p-2
                flex justify-start items-start bg-green-400 bg-opacity-55`
                }>

                    <div
                        className="bg-gray-500 h-full 
                    shadow-xl rounded-xl
                    aspect-square bg-no-repeat bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${folder?.url ?? '/spain-ads.png'})`,
                        }}
                    />
                    <div className="w-full h-full flex flex-col justify-start items-start p-2">
                        <div className="flex flex-row justify-center items-center w-full">
                            <h1 className="text-highlight-cl text-shadow-md text-md">{folder?.title}</h1>
                            <i className="p-2 fa-solid fa-pencil text-yellow-500 text-shadow-sm" />
                        </div>
                        <div className="flex flex-col justify-start items-center w-full">
                            <span>{folder?.description}</span>
                        </div>
                    </div>

                </div>
            }
        </>


    );
};

export default HeaderComponent;