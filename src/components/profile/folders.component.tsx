import React, { useEffect, useState } from "react";
import { IFolder } from "../../interfaces/folder.interface";

interface Props {
    folders: IFolder[];
}
const FoldersComponent: React.FC<Props> = ({ folders: initialFolders }) => {
    const [folders, setFolders] = useState<IFolder[]>(initialFolders);

    useEffect(() => {
        setFolders(initialFolders);
    }, [initialFolders]);

    const handleAddClick = () => {
        setFolders((fold) => {
            return [...fold, {
                title: 'New Folder',
                description: 'New Folder Description',
                privateAccess: 0,
                bgColor: '#ffffff',
                color: '#000000',
                sortOrder: fold.length + 1,
                url: '/avatar.jpg'
            }];
        });
    };

    const handleDeleteClick = (index: number) => {
        setFolders((fold) => {
            return [...fold.slice(0, index), ...fold.slice(index + 1)];
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
                    <span className="uppercase text-opacity-90 text-gray-400">Folders</span>
                </div>
            </div>
            {/* table */}
            <table className="w-full h-full">
                <tbody>
                    {
                        [...folders]?.map((eq, index) => (
                            <tr
                                key={index}
                                className="w-full max-h-20 hover:scale-101 transition ease-in-out delay-75 hover:bg-primary-bg mt-4">
                                <td className="w-2/6 p-3">
                                    <span className="p-2">{eq.title}</span>
                                </td>
                                <td className="w-3/6 text-center">
                                    <span>{eq.description.slice(0, 50)}</span> </td>
                                <td className="w-1/6 text-center">
                                    <span>{(eq.privateAccess ?? 0) === 0
                                        ? <i className="p-2 fa-solid fa-image text-yellow-400 hover:bg-main-bg hover:scale-125" />
                                        : <i className="p-2 fa-solid fa-image text-yellow-50 hover:bg-yellow-500 hover:scale-125" />}
                                    </span>
                                    <span>
                                        <i className="p-2 fas fa-trash hover:bg-danger-bg hover:scale-125"
                                            onClick={() => handleDeleteClick(index)}
                                        />
                                    </span>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FoldersComponent;