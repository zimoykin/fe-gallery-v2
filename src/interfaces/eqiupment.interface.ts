export interface IEquipment {
  id?: string;
  name: string;
  favorite: number; // 1 - true, 0 - false
  category: "camera" | "lens" | "other";
}
