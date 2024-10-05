import React, { useCallback, useEffect, useState } from "react";
import { IEquipment } from "../../interfaces/eqiupment.interface";
import { translate, useLocale } from "../../contexts/locale";
import EquipmentComponent from "./equipment.component";
import { EquipWithState } from "./types/equip-with-state.type";
import { ApiClient } from "../../networking";
import CameraSpinner from "../camera-spinner/camera-spinner.component";


const EquipmentsComponent: React.FC = () => {

    const [equipments, setEquipments] = useState<EquipWithState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { locale } = useLocale();
    const { equipmentsTitle } = translate[locale];


    const refreshCB = useCallback(() => {
        setIsLoading(true);
        setEquipments([]);
        ApiClient.get<IEquipment[]>('/equipments')
            .then(data => {
                setEquipments(
                    data
                        .map(e => ({ ...e, isEdit: false }))
                        .sort((a, b) => {

                            if (a.favorite && !b.favorite) return -1;
                            if (!a.favorite && b.favorite) return 1;

                            if (a.category === 'camera' && b.category !== 'camera') return -1;
                            if (a.category !== 'camera' && b.category === 'camera') return 1;

                            if (a.category === 'lens' && b.category !== 'lens') return -1;
                            if (a.category !== 'lens' && b.category === 'lens') return 1;

                            return a.name.localeCompare(b.name);
                        })
                );
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [setEquipments]);

    useEffect(() => {
        refreshCB();
    }, [refreshCB]);

    const addNewEquipment = (): EquipWithState => ({
        name: '',
        favorite: 0,
        category: 'other',
        isEdit: true,
        id: 'new-' + equipments.length,
    });

    const handleAddClick = () => {
        setEquipments((eq) => [...eq, addNewEquipment()]);
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
            {isLoading && <div className='hidden w-full md:flex bg-black bg-opacity-60 justify-center items-center md:h-full absolute top-0 left-0' >
                <CameraSpinner size='large' />
            </div>}
            {/* table */}
            <table className="w-full h-full">
                <tbody>
                    {
                        equipments?.map((eq) => (
                            <EquipmentComponent
                                key={eq.id}
                                equipment={eq}
                                onDeleteClick={() => {
                                    setEquipments((eqs) => eqs.filter((e) => e.id !== eq.id));
                                }}
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