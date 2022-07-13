import { DbObject } from "./global";

export interface IUser extends Partial<DbObject> {
  username: string;
  email: string;
  password: string;
  emailVerified?: boolean;
}
