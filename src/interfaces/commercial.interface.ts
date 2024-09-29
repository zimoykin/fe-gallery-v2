export interface ICommercial {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  location?: string;
  category?: "trip" | "hotel" | "restaurant" | "camera" | "lens" | "other";
  url?: string;
  profileId: string;
}
