export interface IUserFolder {
  id: string;
  profileId: string;
  title: string;
  bgColor: string;
  color: string;
  description: string;
  sortOrder: number;
  url?: string;
  privateAccess?: number; // 0 = public, 1 = private
}

export interface IFoldersAndTotal extends IUserFolder {
  totalPhotos: number;
}

export type IFolder = Omit<IUserFolder, "id" | "profileId">;
