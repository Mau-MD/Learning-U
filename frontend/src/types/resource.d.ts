import Parse from "parse/node";
import { CourseDifficulty } from "../types/course";

export interface IResource {
  objectId: string;
  status: ResourceStatus;
  level: CourseDifficulty;
  feedback: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  channel: string;
  course: Parse.Object<Parse.Attributes>;
  videoId: string;
}
