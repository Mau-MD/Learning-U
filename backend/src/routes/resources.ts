import express from "express";
import { runInNewContext } from "vm";
import { getAuthUser } from "../middleware/getAuthUser";
import {
  getResourcesFromCourse,
  getResourcesFromCourseAndDifficulty,
  updateResourceStatus,
} from "../resources/resources";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";

const resources = express.Router();

resources.use(getAuthUser);

resources.get(
  "/byCourse/:courseId/:level",
  async (req: RequestWUser, res, next) => {
    const { courseId, level } = req.params;
    try {
      const courses = await getResourcesFromCourseAndDifficulty(
        courseId,
        parseInt(level)
      );
      res.send(courses);
    } catch (err) {
      next(new BadRequestError(err));
    }
  }
);

resources.get("/byCourse/:courseId", async (req: RequestWUser, res, next) => {
  const { courseId } = req.params;
  const resources = await getResourcesFromCourse(courseId);
  res.send(resources);
});

resources.put(
  "/updateStatus/:resourceId",
  async (req: RequestWUser, res, next) => {
    const { user } = req;
    const { resourceId } = req.params;
    const { status, courseName, courseId, resourceName } = req.body;

    if (!status || !courseName || !courseId || !resourceName) {
      next(new BadRequestError("Missing params"));
      return;
    }
    try {
      const resource = await updateResourceStatus(
        resourceName,
        resourceId,
        status,
        courseName,
        courseId,
        user
      );
      const result = await resource.save();

      res.send(result);
    } catch (err) {
      next(new BadRequestError(err));
    }
  }
);

export default resources;
