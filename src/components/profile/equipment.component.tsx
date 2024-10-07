import React, { useState } from "react";
import { EquipWithState } from "./types/equip-with-state.type";
import { ApiClient } from "../../networking";
import { IEquipment } from "../../interfaces/eqiupment.interface";
import { toast } from "react-toastify";
import CameraSpinnerModal from "../camera-spinner/camera-spinner-modal.component";

interface Props {
    equipment: EquipWithState;
    onDeleteClick: () => void;
    refresh: () => void;
}

const EquipmentComponent: React.FC<Props> = ({ equipment: initial, onDeleteClick, refresh }) => {

    const [id, setId] = useState<string | undefined>(initial.id);
    const [name, setName] = useState<string>(initial.name);
    const [favorite, setFavorite] = useState<number>(initial.favorite);
    const [category, setCategory] = useState<string>(initial.category);
    const [isEdit, setIsEdit] = useState<boolean>(initial.isEdit ?? false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeleteClick = () => {
        setIsEdit(false);
        if (!id?.startsWith('new-')) {
            setIsLoading(true);
            ApiClient.delete<IEquipment>(`/equipments/${id}`)
                .then(() => {
                    onDeleteClick();
                }).catch((error) => {
                    console.error(error);
                    toast.error('Error deleting equipment');
                }).finally(() => {
                    setIsLoading(false);
                });

            return;
        }
        onDeleteClick();
    };

    const handleFavoriteClick = () => {
        setFavorite((prev) => prev === 0 ? 1 : 0);
        if (!id?.startsWith('new-')) {
            setIsLoading(true);
            ApiClient.put<IEquipment>(`/equipments/${id}`, {
                name,
                favorite: favorite === 0 ? 1 : 0,
                category,
            }).then(() => {
                refresh();
            }).catch((error) => {
                console.error(error);
                toast.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };


    const handleSaveClick = () => {
        setIsLoading(true);
        if (!id?.startsWith('new-')) {
            // update equipment
            ApiClient.put<IEquipment>(`/equipments/${id}`, {
                name,
                favorite,
                category,
            }).then(() => {
                setIsEdit(false);
            }).catch((error) => {
                console.error(error);
                toast.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            // create equipment
            ApiClient.post<IEquipment>('/equipments', {
                name,
                favorite,
                category,
            }).then((res) => {
                if (res?.id)
                    setId(res.id);
                setIsEdit(false);
            }).catch((error) => {
                console.error(error);
                toast.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    return (<>
        {isLoading && <div className="relative w-full h-full flex justify-center items-center">
            <CameraSpinnerModal />
        </div>
        }
        <tr
            className="w-full hover:scale-101 transition ease-in-out delay-75 hover:bg-primary-bg mt-4">
            <td className="p-2">
                {!isEdit
                    ? <span className="p-2 text-xs">{name}</span >
                    : <input className="p-1 text-xs bg-secondary-bg border rounded-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                }
            </td>
            <td className="">
                {!isEdit
                    ? <span>{category}</span>
                    : <select className="p-1 bg-secondary-bg border rounded-md text-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="camera">Camera</option>
                        <option value="lens">Lens</option>
                        <option value="other">Other</option>
                    </select>
                }
            </td>
            <td className="text-right">

                {!isEdit
                    ?
                    <>
                        <i className={`p-2 fa-solid fa-star ${favorite ? ' text-yellow-400 ' : ' text-gray-500 '} hover:bg-main-bg hover:scale-125`}
                            onClick={handleFavoriteClick}
                        />
                        <i className="p-2 fa-solid fa-pen text-yellow-50 hover:bg-yellow-500 hover:scale-125"
                            onClick={() => setIsEdit(true)}
                        />
                    </>
                    : <div className="flex justify-center items-center gap-2">
                        <i className="p-1 fas fa-save text-yellow-50 hover:bg-yellow-500 hover:scale-125"
                            onClick={handleSaveClick}
                        />
                        <i className="p-1 fas fa-trash hover:bg-danger-bg hover:scale-125"
                            onClick={handleDeleteClick}
                        />
                    </div>
                }
            </td>

        </tr>

    </>);

};


export default EquipmentComponent;