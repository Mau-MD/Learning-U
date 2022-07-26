import { ICourse } from "./course";
import { DbObject } from "./global";
import { IUser } from "./user";

interface IPost extends DbObject {
  content: string;
  user: IUser;
  course?: ICourse;
}
