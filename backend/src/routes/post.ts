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

  const posts = await getPostsByUser(user.id);
  res.send(posts);
});

export default post;
