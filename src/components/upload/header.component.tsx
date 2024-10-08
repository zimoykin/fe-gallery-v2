import React, { useEffect, useState } from "react";
import { IUserFolder } from "../../interfaces/folder.interface";
import { ApiClient } from "../../networking";
import { IPhoto } from "../../interfaces/photo.interface";


interface Props {
    folder?: IUserFolder;
    onEditClick: () => void;
}

const HeaderComponent: React.FC<Props> = ({ folder, onEditClick }) => {

    const gradient = `
            linear-gradient(to right, 
            ${folder?.leftTopColor ?? '#203e32'},
            ${folder?.leftBottomColor ?? '#1c382a'}, 
            ${folder?.centerTopColor ?? '#2b5a4e'},
            ${folder?.centerBottomColor ?? '#2b5a4e'},
            ${folder?.rightTopColor ?? '#cb2f3c'}, 
            ${folder?.rightBottomColor ?? '#b00011'}
            )
    `;

    const [favorite, setFavorite] = useState<IPhoto>();

    useEffect(() => {
        if (folder && folder?.favoriteFotoId) {
            ApiClient.get<IPhoto>(`/photos/${folder?.id}/${folder?.favoriteFotoId}/preview`)
                .then(res => {
                    setFavorite(res);
                })
                .catch(console.error);
        }
    }, [folder?.favoriteFotoId, folder]);

    return (
        <>
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
                        backgroundImage: `url(${favorite?.previewUrl ?? '/spain-ads.png'})`,
                    }}
                />
                <div className="w-full h-full flex flex-col justify-start items-start p-2">
                    <div className="flex flex-row justify-center items-center w-full">
                        <h1 className="text-highlight-cl text-shadow-md text-xl md:text-5xl">{folder?.title}</h1>
                        <i className="p-2 fa-solid fa-pencil text-yellow-500 text-shadow-sm cursor-pointer"
                            onClick={onEditClick} />
                    </div>
                    <div className="flex flex-col justify-start items-center w-full">
                        <span>{folder?.description}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderComponent;