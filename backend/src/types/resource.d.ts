import { ICourse } from "./course";
import Parse from "parse/node";

export type IResourceStatus = "not started" | "in progress" | "completed";

export type IResource =
  | {
      type: "video";
      status: "not started" | "in progress" | "completed";
      level: 1 | 2;
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
  | {
      type: "website";
      status: "not started" | "in progress" | "completed";
      level: 1 | 2;
      feedback: number;
      title: string;
      url: string;
      course: Parse.Object<Parse.Attributes>;
      user: Parse.User<Parse.Attributes>;
    };
