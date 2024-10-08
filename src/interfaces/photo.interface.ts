export interface IPhoto {
  id: string;
  sortOrder: number;
  profileId: string;
  folderId: string;
  camera: string;
  lens?: string;
  iso?: string;
  film?: string;
  location?: string;
  description?: string;
  likes?: number;
  previewUrl?: string;
  originalUrl?: string;
  compressedUrl?: string;
  privateAccess?: number; // 0 - public, 1 - private
  isFavorite: boolean;
}

export interface IPhotoWithImageFile extends Partial<IPhoto> {
  file?: File;
}
