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


    return (
        <div className="flex flex-col w-full">
            {/* comand panel  */}
            <div className="flex justify-start items-start bg-command-panel-bg pt-2 pr-3 pb-3 pl-3 sticky top-0 z-10">
                <i className="p-1 fa-solid fa-plus hover:bg-main-bg hover:scale-125 border transition ease-in-out delay-75" />
            </div>
            {/* table */}
            <table className="w-full h-full">
                {
                    [...folders]?.map((eq) => (
                        <tr className="w-full  hover:scale-101 transition ease-in-out delay-75 hover:bg-primary-bg mt-4">
                            <td className="w-2/6 p-3">
                                <span className="p-2">{eq.title}</span>
                            </td>
                            <td className="w-3/6 text-center">
                                <span>{eq.description}</span> </td>
                            <td className="w-1/6 text-center">
                                <span>{(eq.privateAccess ?? 0) === 0
                                    ? <i className="p-2 fa-solid fa-image text-yellow-400 hover:bg-main-bg hover:scale-125" />
                                    : <i className="p-2 fa-solid fa-image text-yellow-50 hover:bg-yellow-500 hover:scale-125" />}
                                </span>
                                <span>
                                    <i className="p-2 fas fa-trash hover:bg-danger-bg hover:scale-125" />
                                </span>
                            </td>

                        </tr>
                    ))
                }
            </table>
        </div>
    );
};

export default FoldersComponent;