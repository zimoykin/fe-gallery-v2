export interface IOffer {
  id: string;
  title: string;
  text?: string;
  price?: number;
  image?: string;
  preview: string;
  location?: string;
  category?: "trip" | "hotel" | "restaurant" | "camera" | "lens" | "other";
  url?: string;
  profileId: string;
  availableUntil: number;
}
