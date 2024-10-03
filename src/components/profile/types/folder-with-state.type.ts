import { IFolder } from "../../../interfaces/folder.interface";

export type FolderWithState = IFolder & {
  isEdit: boolean;
  id?: string;
};
