import { ICourse } from "./course";
import Parse from "parse/node";

export type IResourceStatus = "not started" | "in progress" | "completed";

export interface IResource {
  objectId: string;
  status: "not started" | "in progress" | "completed";
  level: 1 | 2;
  feedback: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  channel: string;
  course: Parse.Object<Parse.Attributes>;
  videoId: string;
}
