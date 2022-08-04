import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { RequestWUser } from "../types/user";
import { getUserById } from "../user/user";
import { BadRequestError } from "../utils/errors";

const user = express.Router();

user.use(getAuthUser);

user.get("/by/:id", async (req: RequestWUser, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    next(new BadRequestError(err));
  }
});

export default user;
