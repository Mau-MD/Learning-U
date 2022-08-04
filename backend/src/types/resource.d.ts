import { CourseDifficulty, ICourse } from "./course";
import Parse from "parse/node";
import { DbObject } from "./global";

export type IResourceStatus = "not started" | "in progress" | "completed";

export interface IResource {
  status: "not started" | "in progress" | "completed";
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
