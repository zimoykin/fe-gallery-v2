export interface IUserFolder {
  id: string;
  profileId: string;
  title: string;
  leftBottomColor?: string;
  leftTopColor?: string;
  rightBottomColor?: string;
  rightTopColor?: string;
  centerBottomColor?: string;
  centerTopColor?: string;
  description: string;
  sortOrder: number;
  url?: string;
  favoriteFotoId: string;
  privateAccess?: number; // 0 = public, 1 = private
}

export interface IFoldersAndTotal extends IUserFolder {
  totalPhotos: number;
}

export type IFolder = Omit<IUserFolder, "id" | "profileId">;
