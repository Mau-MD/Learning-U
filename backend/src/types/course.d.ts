import { DbObject } from "./global";

export interface ICourse extends DbObject {
  name: string;
  resources: any[];
}

export const enum CourseDifficulty {
  Beginner = 1,
  Advanced,
}
