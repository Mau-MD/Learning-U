import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { createPost, getPostsByUser } from "../post/post";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";

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

post.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { limit, skip } = req.query;
  if (
    !limit ||
    typeof limit !== "string" ||
    !skip ||
    typeof skip !== "string"
  ) {
    next(new BadRequestError("Missing parameters"));
    return;
  }

  const posts = await getPostsByUser(user.id, parseInt(limit), parseInt(skip));
  res.send(posts);
});

export default post;
