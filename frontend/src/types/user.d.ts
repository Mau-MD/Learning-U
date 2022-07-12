import { DbObject } from "./global";

interface IUser extends DbObject {
  username: string;
  email: string;
  sessionToken: string;
  ACL: object;
}
