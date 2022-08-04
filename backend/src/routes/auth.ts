import express from "express";
import Parse from "parse/node";
import { BadRequestError } from "../utils/errors";
import type { IUser } from "../types/user";

const auth = express.Router();

auth.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  try {
    const user = await Parse.User.logIn(username, password);
    res.send({ user: user });
  } catch (error) {
    next(new BadRequestError("Login failed: " + error));
  }
});

auth.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  const user = new Parse.User({ username, password, email });

  try {
    await user.signUp();
    res.status(201).send(user);
  } catch (error) {
    next(new BadRequestError("Failed to created user: " + error));
  }
});
export default auth;
