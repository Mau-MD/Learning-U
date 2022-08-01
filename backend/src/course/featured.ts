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
