import express from "express";
import { cloneCourse } from "../course/clone";
import {
  createCourse,
  deleteCourse,
  generateResources,
  getCourseByUserAndId,
  getProgressByCourse,
  getUserCourses,
  getUserCoursesWithLimits,
  saveResources,
} from "../course/course";
import { getAuthUser } from "../middleware/getAuthUser";
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

  const courses = await getUserCoursesWithLimits(
    user,
    parseInt(limit),
    parseInt(skip)
  );
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

course.post("/clone/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;
  const { name } = req.body;

  if (!name) {
    next(new BadRequestError("Missing params"));
    return;
  }

  try {
    const course = await cloneCourse(name, courseId, user);
    res.send(course);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.delete("/:courseId", async (req: RequestWUser, res, next) => {
  // I want to both delete the course and take feedback into consideration
  const { courseId } = req.params;
  const { dislikedVideos } = req.body;

  if (dislikedVideos === undefined) {
    next(new BadRequestError("Missing parameters"));
    return;
  }

  const deletedCourse = await deleteCourse(courseId, dislikedVideos);

  res.send(deletedCourse);
});

export default course;
