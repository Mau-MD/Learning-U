import express from "express";
import {
  followUser,
  getFollowers,
  getFollowersIds,
} from "../following/following";
import { setStatus } from "../following/status";
import { getAuthUser } from "../middleware/getAuthUser";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";

const follow = express.Router();

follow.use(getAuthUser);

follow.get("/getFollowers", async (req: RequestWUser, res, next) => {
  const { user } = req;

  res.send(await getFollowersIds(user));
});

follow.post("/followUser/:targetId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { targetId } = req.params;

  const Follower = followUser(user, targetId);
  res.send(await Follower.save());
});

follow.post("/status", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { status } = req.body;

  if (!status) {
    next(new BadRequestError("Missing params"));
    return;
  }

  res.send(await setStatus(user, status));
});

export default follow;
