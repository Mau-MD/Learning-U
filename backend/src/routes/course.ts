import express from "express";
import {
  createCourse,
  createResource,
  generateResources,
  saveResources,
} from "../course/course";
import { ICourse } from "../types/course";
import { BadRequestError } from "../utils/errors";

const course = express.Router();

course.post("/new", async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  const course = createCourse(name);
  const { beginner, advanced } = await generateResources(name);

  try {
    // Save course first
    const courseData = await course.save();

    await saveResources(beginner, course, 1);
    await saveResources(advanced, course, 2);

    res.status(201).send(courseData);
  } catch (error) {
    next(new BadRequestError(error));
  }
});

export default course;
