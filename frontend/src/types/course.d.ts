import { DbObject } from "./global";
import { IUnsplashLinks } from "./image";
import { IUser } from "./user";

export interface ICourse extends DbObject {
  name: string;
  user: IUser;
  images: IUnsplashLinks[];
}
