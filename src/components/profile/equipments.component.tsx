import React, { useCallback, useEffect, useState } from "react";
import { IEquipment } from "../../interfaces/eqiupment.interface";
import { translate, useLocale } from "../../contexts/locale";
import EquipmentComponent from "./equipment.component";
import { EquipWithState } from "./types/equip-with-state.type";
import { ApiClient } from "../../networking";


const EquipmentsComponent: React.FC = () => {

    const [equipments, setEquipments] = useState<EquipWithState[]>([]);

    const { locale } = useLocale();
    const { equipmentsTitle } = translate[locale];


    const refreshCB = useCallback(() => {
        ApiClient.get<IEquipment[]>('/equipments')
            .then(data => {
                setEquipments(
                    data.map((equipment) => {
                        return {
                            ...equipment,
                            isEdit: false
                        };
                    })
                );
            })
            .catch(error => {
                console.error(error);
            });
    }, [setEquipments]);

    useEffect(() => {
        refreshCB();
    }, [refreshCB]);

    const addNewEquipment = (): EquipWithState => ({
        name: 'New Equipment',
        favorite: 0,
        category: 'other',
        isEdit: true,
    });

    const handleAddClick = () => {
        setEquipments((eq) => [...eq, addNewEquipment()]);
    };
    const handleDeleteClick = (index: number) => {
        setEquipments((eq) => {
            return [...eq.slice(0, index), ...eq.slice(index + 1)];
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
                    <i className="p-1 fas fa-list text-opacity-90 text-gray-400" />
                    <span className="uppercase text-opacity-90 text-gray-400">{equipmentsTitle}</span>
                </div>
            </div>
            {/* table */}
            <table className="w-full h-full">
                <tbody>
                    {
                        equipments?.map((eq, index) => (
                            <EquipmentComponent
                                key={eq.id || index}
                                equipment={eq}
                                onDeleteClick={() => handleDeleteClick(index)}
                                refresh={refreshCB}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
export default EquipmentsComponent;