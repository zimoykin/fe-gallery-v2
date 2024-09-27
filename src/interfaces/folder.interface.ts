export interface IUserFolder {
  id: string;
  profileId: string;
  title: string;
  bgColor: string;
  color: string;
  description: string;
  sortOrder: number;
  url?: string;
  privateAccess?: number;
}

export interface IFoldersAndTotal extends IUserFolder {
  totalPhotos: number;
}

export type IFolder = Omit<IUserFolder, "id" | "profileId">;
