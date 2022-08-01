// A featured course is just a

import Parse from "parse/node";
import { cloneCourse } from "./clone";
import { createCourse, getCourseByUserAndId } from "./course";

export const makeAnExistingCourseFeautured = async (
  courseId: string,
  user: Parse.User<Parse.Attributes>
) => {
  const course = await getCourseByUserAndId(user, courseId);

  const featuredCourse = await cloneCourse(
    course.get("name"),
    courseId,
    undefined,
    true
  );

  return course;
};

export const getAllFeaturedCourses = async (
  limit: number,
  skip: number,
  searchQuery: string
) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("isFeautured", true);
  query.descending("createdAt");
  query.matches("name", new RegExp(searchQuery), "i");
  query.limit(limit);
  query.skip(skip);

  const courses = await query.find();

  return courses;
};
