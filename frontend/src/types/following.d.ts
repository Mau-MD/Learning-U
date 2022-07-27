import { DbObject } from "./global";
import { IUser } from "./user";

export interface IFollowing extends DbObject {
  status: string;
  user: IUser;
}
