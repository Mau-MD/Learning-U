import express from "express";
import { followUser } from "../following/following";
import { RequestWUser } from "../types/user";

const follow = express.Router();

follow.post("/:targetId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { targetId } = req.params;

  const Follower = followUser(user, targetId);
  res.send(await Follower.save());
});

export default follow;
