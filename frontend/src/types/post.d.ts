import { DbObject } from "./global";

interface IPost extends DbObject {
  content: string;
  user: string;
  course: id;
}
