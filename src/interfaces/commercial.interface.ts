import { ILocation } from "./location.interface";

export interface IOffer {
  id: string;
  title: string;
  text?: string;
  price?: number;
  discount?: number;
  image?: string;
  previewUrl: string;
  compressedUrl: string;
  location?: ILocation;
  categories?: string[];
  url?: string;
  profileId: string;
  availableUntil: number;
}
