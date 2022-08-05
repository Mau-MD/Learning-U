import { ICourse } from "./course";
import Parse from "parse/node";
import { DbObject } from "./global";
import { CourseDifficulty, ResourceStatus } from "./enums";

export interface IResource {
  status: ResourceStatus;
  level: CourseDifficulty;
  feedback: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  channel: string;
  course: Parse.Object<Parse.Attributes>;
  user: Parse.User<Parse.Attributes>;
  videoId: string;
}
