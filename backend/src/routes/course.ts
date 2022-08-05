import { zhCN } from "date-fns/locale";
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
import {
  createCourseFromScratch,
  dislikeFeaturedCourse,
  getAllFeaturedCourses,
  likeFeaturedCourse,
  makeAnExistingCourseFeautured,
} from "../course/featured";
import { getAuthUser } from "../middleware/getAuthUser";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";
import { getInfiniteQueryParams } from "../utils/infiniteQuery";
import { parseObjectsToJson } from "../utils/parseToJason";

const course = express.Router();

course.use(getAuthUser);

course.post("/new", async (req: RequestWUser, res, next) => {
  const { name } = req.body;
  const { user } = req;

  if (!name || !user) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  try {
    const course = await createCourse(name, user);
    const { beginner, advanced } = await generateResources(name);

    // Save course first
    const courseData = await course.save();

    await saveResources(beginner, course, 1, user);
    await saveResources(advanced, course, 2, user);

    res.status(201).send(courseData);
  } catch (error) {
    next(new BadRequestError(error.message));
  }
});

course.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { limit, skip, query } = getInfiniteQueryParams(req);

  try {
    const courses = await getUserCoursesWithLimits(
      user,
      parseInt(limit),
      parseInt(skip),
      query
    );
    res.send(courses);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.get("/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  try {
    const course = await getCourseByUserAndId(user, courseId);
    res.send(course);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.get("/progress/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  try {
    const progress = await getProgressByCourse(user, courseId);
    res.send(progress);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
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

  try {
    const deletedCourse = await deleteCourse(courseId, dislikedVideos);

    res.send(deletedCourse);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.get("/featured/get", async (req: RequestWUser, res, next) => {
  const { user } = req;
  try {
    const { limit, skip, query } = getInfiniteQueryParams(req);

    const featuredCourses = await getAllFeaturedCourses(
      parseInt(limit),
      parseInt(skip),
      query,
      user
    );
    res.send(featuredCourses);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.post("/makeFeatured/:courseId", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { courseId } = req.params;

  try {
    const featuredCourse = await makeAnExistingCourseFeautured(courseId, user);
    res.send(featuredCourse);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.post("/fromScratch", async (req: RequestWUser, res, next) => {
  const { user } = req;
  const { urls, name } = req.body;

  if (!urls || urls.length !== 6 || !name) {
    next(new BadRequestError("Missing params"));
    return;
  }

  try {
    const course = await createCourseFromScratch(urls, name, user);
    res.send(course);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

course.post(
  "/featured/like/:courseId",
  async (req: RequestWUser, res, next) => {
    const { user } = req;
    const { courseId } = req.params;

    try {
      res.send(await likeFeaturedCourse(courseId, user));
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  }
);

course.post(
  "/featured/dislike/:courseId",
  async (req: RequestWUser, res, next) => {
    const { user } = req;
    const { courseId } = req.params;

    try {
      res.send(await dislikeFeaturedCourse(courseId, user));
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  }
);

export default course;
