export interface IOffer {
  id: string;
  title: string;
  text?: string;
  price?: number;
  image?: string;
  previewUrl: string;
  compressedUrl: string;
  location?: string;
  category?: "trip" | "hotel" | "restaurant" | "camera" | "lens" | "other";
  url?: string;
  profileId: string;
  availableUntil: number;
}
