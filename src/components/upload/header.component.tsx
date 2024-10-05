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
    const [gradient, setGradient] = useState('');

    useEffect(() => {
        setIsLoading(true);
        ApiClient.get<IUserFolder>(`/folders/${folderId}`)
            .then((res) => {
                console.log(res);
                setFolder(res);

                const newGradient = `
                linear-gradient(to right, 
                ${res.leftTopColor ?? '#203e32'},
                ${res.leftBottomColor ?? '#1c382a'}, 
                ${res.centerTopColor ?? '#2b5a4e'},
                ${res.centerBottomColor ?? '#2b5a4e'},
                ${res.rightTopColor ?? '#cb2f3c'}, 
                ${res.rightBottomColor ?? '#b00011'}
                )
            `;
                setGradient(newGradient);

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
                    flex justify-start items-start `}
                    style={{
                        background: gradient,
                    }}
                >


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