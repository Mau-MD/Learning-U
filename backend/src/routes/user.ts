import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { RequestWUser } from "../types/user";
import { getUserById } from "../user/user";

const user = express.Router();

user.use(getAuthUser);

user.get("/by/:id", async (req: RequestWUser, res, next) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.send(user);
});

export default user;
