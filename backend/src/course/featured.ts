// A featured course is essentially a course without an owner. So no user is associated with it. And it's shared publicly with all the users

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
    course.get("objectId"),
    null,
    true
  );

  return featuredCourse;
};
