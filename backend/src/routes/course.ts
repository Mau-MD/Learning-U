import express from "express";
import { readdirSync } from "fs";
import { reseller_v1 } from "googleapis";
import {
  createCourse,
  generateResources,
  getCourseByUserAndId,
  getProgressByCourse,
  getUserCourses,
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

  const course = await createCourse(name, user);
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

course.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;

  const courses = await getUserCourses(user);
  res.send(courses);
});

course.get("/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const course = await getCourseByUserAndId(user, courseId);
  res.send(course);
});

course.get("/progress/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  const progress = await getProgressByCourse(user, courseId);
  res.send(progress);
});

export default course;
