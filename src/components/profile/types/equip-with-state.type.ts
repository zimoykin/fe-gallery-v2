import { IEquipment } from "../../../interfaces/eqiupment.interface";

export type EquipWithState = IEquipment & {
  isEdit: boolean;
  id?: string;
};
