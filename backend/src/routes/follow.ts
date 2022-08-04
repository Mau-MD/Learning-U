import express from "express";
import {
  followUser,
  getFollowers,
  getFollowersAsUserObjects,
  getFollowersIds,
  unfollowUser,
} from "../following/following";
import {
  findStatusByMultipleUsers,
  findStatusByUser,
  setStatus,
} from "../following/status";
import { getAuthUser } from "../middleware/getAuthUser";
import { getFollowingPosts } from "../post/post";
import { RequestWUser } from "../types/user";
import { getUserById } from "../user/user";
import { BadRequestError } from "../utils/errors";

const follow = express.Router();

follow.use(getAuthUser);

follow.get("/getFollowers", async (req: RequestWUser, res, next) => {
  const { user } = req;

  res.send(await getFollowersIds(user));
});

follow.post("/followUser/:username", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { username } = req.params;

  try {
    const Follower = await followUser(user, username);
    res.send(await Follower.save());
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

follow.post("/status", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { status } = req.body;

  if (!status) {
    next(new BadRequestError("Missing params"));
    return;
  }

  try {
    res.send(await setStatus(user, status));
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

follow.get("/status/by/:id", async (req: RequestWUser, res, next) => {
  const { id } = req.params;
  try {
    const user = (await getUserById(id)) as Parse.User<Parse.Attributes>;
    const following = await getFollowersAsUserObjects(user);
    const status = await findStatusByMultipleUsers(following);
    res.send(status);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

follow.get("/following/status", async (req: RequestWUser, res, next) => {
  const { user } = req;

  try {
    const following = await getFollowersAsUserObjects(user);
    const status = await findStatusByMultipleUsers(following);
    res.send(status);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

follow.get("/status/:id", async (req: RequestWUser, res, next) => {
  const { id } = req.params;
  try {
    const user = (await getUserById(id)) as Parse.User<Parse.Attributes>;
    const status = await findStatusByUser(user);
    res.send(status[0]);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

follow.delete("/:userId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { userId } = req.params;
  try {
    res.send(await unfollowUser(user, userId));
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

export default follow;
