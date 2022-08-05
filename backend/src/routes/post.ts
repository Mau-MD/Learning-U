import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import {
  createPost,
  getFollowingPosts,
  getPostsByUser,
  getPostsByUsername,
} from "../post/post";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";
import { getInfiniteQueryParams } from "../utils/infiniteQuery";

const post = express.Router();

post.use(getAuthUser);

post.post("/", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { content, courseId } = req.body;

  if (!content) {
    next(new BadRequestError("Missing parameters"));
    return;
  }

  try {
    const post = createPost(content, user, courseId);
    const result = await post.save();
    res.status(201).send(result);
  } catch (err) {
    next(new BadRequestError(err));
    return;
  }
});

post.get("/from/:id", async (req: RequestWUser, res, next) => {
  const { id } = req.params;
  try {
    const { limit, skip, query } = getInfiniteQueryParams(req);

    const posts = await getPostsByUser(id, parseInt(limit), parseInt(skip));
    res.send(posts);
  } catch (err) {
    next(new BadRequestError(err));
  }
});

post.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;
  try {
    const { limit, skip } = getInfiniteQueryParams(req);

    const posts = await getPostsByUser(
      user.id,
      parseInt(limit),
      parseInt(skip)
    );
    res.send(posts);
  } catch (err) {
    next(new BadRequestError(err));
  }
});

post.get("/following", async (req: RequestWUser, res, next) => {
  const { user } = req;

  try {
    const { limit, skip } = getInfiniteQueryParams(req);

    const posts = await getFollowingPosts(
      user,
      parseInt(limit),
      parseInt(skip)
    );
    res.send(posts);
  } catch (err) {
    next(new BadRequestError(err));
  }
});

export default post;
