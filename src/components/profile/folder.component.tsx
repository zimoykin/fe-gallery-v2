import React, { useState } from "react";
import { FolderWithState } from "./types/folder-with-state.type";
import { ApiClient } from "../../networking";
import { IUserFolder } from "../../interfaces/folder.interface";
import { Link } from "react-router-dom";

interface Props {
    folder: FolderWithState;
    onDeleteClick: () => void;
}

const FolderComponent: React.FC<Props> = ({ folder: initial, onDeleteClick }) => {

    const [id, setId] = useState<string | undefined>(initial.id);
    const [title, setTitle] = useState<string>(initial.title);
    const [description, setDescription] = useState<string>(initial.description);
    const [privateAccess, setPrivateAccess] = useState<number>(initial.privateAccess ?? 0);
    const [isEdit, setIsEdit] = useState<boolean>(initial.isEdit ?? false);

    const handleDeleteClick = () => {
        ApiClient.delete<IUserFolder>(`/folders/${id}`)
            .then(() => {
                onDeleteClick();
            }).catch((error) => {
                console.error(error);
            });
    };
    const handlePrivacyClick = () => {
        setPrivateAccess((prev) => prev === 0 ? 1 : 0);
        setTimeout(() => {
            ApiClient.put<IUserFolder>(`/folders/${id}`, {
                ...initial,
                privateAccess: privateAccess === 0 ? 1 : 0,
                title,
                description,
                bgColor: initial.bgColor,
                color: initial.color,
                sortOrder: initial.sortOrder,
                url: initial.url,

            }).catch((error) => {
                console.error(error);
            });
        }, 0);
    };

    const handleSaveClick = () => {

        if (id) {
            // update folder
            ApiClient.put<IUserFolder>(`/folders/${id}`, {
                ...initial,
                title,
                description,
                privateAccess
            }).then((res) => {

                setTitle(res.title);
                setDescription(res.description);
                setPrivateAccess(res.privateAccess ?? 0);

            }).catch((error) => {
                console.error(error);
            });
        } else {
            // create folder
            ApiClient.post<IUserFolder>('/folders', {
                ...initial,
                title,
                description,
                privateAccess
            }).then((res) => {
                setTitle(res.title);
                setDescription(res.description);
                setPrivateAccess(res.privateAccess ?? 0);
                setId(res.id);
                setIsEdit(false);
            }).catch((error) => {
                console.error(error);
            });
        }

        setIsEdit(false);
    };

    const handleUploadImageClick = () => {

    };

    return (<>
        <tr
            className="w-full P-2 max-h-20 hover:scale-101 transition ease-in-out delay-75 hover:bg-primary-bg mt-4">
            {/* privateAccess */}
            <td className="justify-start items-start">
                {!isEdit
                    ? <div
                        onClick={handlePrivacyClick}
                    >{(privateAccess ?? 0) > 0
                        ? <i className="p-1 fa-solid fa-shield text-red-400 hover:bg-main-bg hover:scale-105" />
                        : <i className="p-1 fa-solid fa-earth text-yellow-400 hover:bg-yellow-500 hover:scale-105" />}
                    </div>
                    :
                    null
                }
            </td>

            {/* title */}
            <td className=" justify-start items-start">
                {!isEdit
                    ? <span className="p-2 text-xs">{title}</span>
                    : <input
                        className="p-1 bg-secondary-bg border rounded-md"
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                }
            </td>

            {/* description */}
            <td className=" justify-start items-start">
                {!isEdit
                    ? <span className="p-1 text-xs">{description.slice(0, 50)}</span>
                    : <input className="p-1 text-xs bg-secondary-bg border rounded-md" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                }
            </td>

            {/* actions */}
            <td className="text-right">
                {!isEdit
                    ?
                    <>
                        <Link to={`/upload/${id}`}>
                            <i className="p-2 fa-solid fa-image text-yellow-50 hover:bg-yellow-500 hover:scale-105"
                            />
                        </Link>
                        <i className="p-2 fa-solid fa-pencil text-yellow-50 hover:bg-yellow-500 hover:scale-105"
                            onClick={() => setIsEdit(true)}
                        />
                    </>
                    :
                    <>
                        <i className="p-2 fas fa-save text-yellow-50 hover:bg-yellow-500 hover:scale-105"
                            onClick={handleSaveClick}
                        />
                        <i className="p-2 fas fa-trash hover:bg-danger-bg hover:scale-125"
                            onClick={handleDeleteClick}
                        />
                    </>
                }
            </td>

        </tr>
    </>);
};

export default FolderComponent;