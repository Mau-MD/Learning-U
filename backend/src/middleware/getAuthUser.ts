import Parse from "parse/node";
import { Express, Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors";
import { IUser, RequestWUser } from "../types/user";

export const getAuthUser = async (
  req: RequestWUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    next(new BadRequestError("Missing authorization header"));
    return;
  }
  try {
    Parse.User.enableUnsafeCurrentUser();
    const user = await Parse.User.become(token);
    req.user = user;
    next();
  } catch (error) {
    next(new BadRequestError("Invalid token"));
  }
};
