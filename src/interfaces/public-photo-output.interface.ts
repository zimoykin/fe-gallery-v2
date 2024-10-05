import { IPhoto } from "./photo.interface";
import { IProfile } from "./profile.interface";

export interface PublicPhotoOutputDto {
  photo: IPhoto;
  profile: IProfile;
}
