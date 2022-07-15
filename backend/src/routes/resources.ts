import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import {
  getResourcesFromCourse,
  getResourcesFromCourseAndDifficulty,
} from "../resources/resources";
import { RequestWUser } from "../types/user";

const resources = express.Router();

resources.use(getAuthUser);

resources.get(
  "/byCourse/:courseId/:level",
  async (req: RequestWUser, res, next) => {
    const { courseId, level } = req.params;
    const courses = await getResourcesFromCourseAndDifficulty(
      courseId,
      parseInt(level)
    );
    res.send(courses);
  }
);

export default resources;
