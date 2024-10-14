import { IEquipment } from "./eqiupment.interface";
import { ILocation } from "./location.interface";

export interface IProfile {
  id: string;
  userId: string;
  name?: string;
  location?: ILocation;
  bio?: string;
  website?: string;
  privateAccess: boolean; // 0 - public, 1 - private
  url?: string;
  favoriteCamera?: IEquipment;
  favoriteLens?: IEquipment;
  email: string;
}
