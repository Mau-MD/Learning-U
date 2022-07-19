import express from "express";
import {
  createCourse,
  createResource,
  generateResources,
  saveResources,
} from "../course/course";
import { getAuthUser } from "../middleware/getAuthUser";
import { ICourse } from "../types/course";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";

const course = express.Router();

course.use(getAuthUser);

course.post("/new", async (req: RequestWUser, res, next) => {
  const { name } = req.body;
  const { user } = req;

  if (!name || !user) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  const course = createCourse(name, user);
  const { beginner, advanced } = await generateResources(name);

  try {
    // Save course first
    const courseData = await course.save();

    await saveResources(beginner, course, 1, user);
    await saveResources(advanced, course, 2, user);

    res.status(201).send(courseData);
  } catch (error) {
    next(new BadRequestError(error));
  }
});

export default course;
