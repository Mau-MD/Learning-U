import { DbObject } from "./global";

export interface IUser extends DbObject {
  username: string;
  email: string;
  emailVerified: boolean;
}
