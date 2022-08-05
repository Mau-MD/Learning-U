import { DbObject } from "./global";

export interface ICourse extends DbObject {
  name: string;
  resources: any[];
}
