import { Request } from "express";
import { DbObject } from "./global";
import Parse from "parse/node";

export interface IUser extends Partial<DbObject> {
  username: string;
  email: string;
  password: string;
  emailVerified?: boolean;
}

export type RequestWUser = Request & { user: Parse.User<Parse.Attributes> };
