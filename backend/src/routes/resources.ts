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
    const courses = await getResourcesFromCourseAndDifficulty(
      courseId,
      parseInt(level)
    );
    res.send(courses);
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
    const { resourceId } = req.params;
    const { status } = req.body;

    if (!status) {
      next(new BadRequestError("Status is missing"));
      return;
    }

    const resource = await updateResourceStatus(resourceId, status);
    const result = await resource.save();

    res.send(result);
  }
);

export default resources;
