import React, { useEffect, useState } from "react";
import { IEquipment } from "../../interfaces/eqiupment.interface";

interface Props {
    equipments: IEquipment[];
}

const EquipmentsComponent: React.FC<Props> = ({ equipments: initial }) => {

    const [equipments, setEquipments] = useState<IEquipment[]>(initial);

    useEffect(() => {
        setEquipments(initial);
    }, [initial]);

    const handleAddClick = () => {
        setEquipments((eq) => {
            return [...eq, {
                name: 'New Equipment',
                favorite: false,
                type: 'other'
            }];
        });
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
            </div>
            {/* table */}
            <table className="w-full h-full">
                {
                    [...equipments]?.map((eq, index) => (
                        <tr
                            key={index}
                            className="w-full  hover:scale-101 transition ease-in-out delay-75 hover:bg-primary-bg mt-4">
                            <td className="w-4/6 p-2">
                                <span className="p-2">{eq.name}</span>
                            </td>
                            <td className="w-1/6 text-center">
                                <span>{eq.type}</span> </td>
                            <td className="w-1/6 text-center">
                                <span>{eq.favorite
                                    ? <i className="p-2 fa-solid fa-star text-yellow-400 hover:bg-main-bg hover:scale-125" />
                                    : <i className="p-2 fa-solid fa-star text-yellow-50 hover:bg-yellow-500 hover:scale-125" />}
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
            </table>
        </div>
    );
};
export default EquipmentsComponent;