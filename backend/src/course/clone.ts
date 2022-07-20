import Parse from "parse/node";
import { createResource, getResourcesFromCourse } from "../resources/resources";
import { parseObjectsToJson } from "../utils/parseToJason";
import { createCourse } from "./course";
/*
To clone a course:
  1. Create a new course (destination course)
  2. Fetch all resources from the course that wants to be cloned
  3. Create new resources with content from the other one
  4. Make sure to reference the destination course with the resources
*/

export const cloneCourse = async (
  courseName: string,
  courseId: string,
  user: Parse.User<Parse.Attributes>
) => {
  const course = await createCourse(courseName, user);
  const resources = parseObjectsToJson(await getResourcesFromCourse(courseId));

  if (!resources || resources.length === 0) {
    throw new Error("Course doesn't exist");
  }

  await course.save();

  for (const resource of resources) {
    const newResource = createResource({
      type: resource.type,
      status: "not started",
      url: resource.url,
      level: resource.level,
      title: resource.title,
      description: resource.description,
      thumbnail: resource.thumbnail,
      feedback: 0,
      course,
      user,
    });

    await newResource.save();
  }

  return course;
};
