import express from "express";
import { createCourse } from "../course/course";
import { ICourse } from "../types/course";
import { BadRequestError } from "../utils/errors";

const course = express.Router();

course.post("/new", (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    next(new BadRequestError("Missing attributes"));
    return;
  }

  const course = createCourse(name);
});

export default course;
