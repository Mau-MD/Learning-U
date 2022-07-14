import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { getResourcesFromCourse } from "../resources/resources";
import { RequestWUser } from "../types/user";

const resources = express.Router();

resources.use(getAuthUser);

resources.get("/byCourse/:courseId", async (req: RequestWUser, res, next) => {
  const { courseId } = req.params;
  const courses = await getResourcesFromCourse(courseId);
  res.send(courses);
});

export default resources;
