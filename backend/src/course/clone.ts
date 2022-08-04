import Parse from "parse/node";
import { updateFeedback } from "../feedback/feedback";
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

export const SCORE_PER_SHARE = 1;

export const cloneCourse = async (
  courseName: string,
  courseId: string,
  user: Parse.User<Parse.Attributes>,
  isFeatured?: boolean
) => {
  try {
    const course = await createCourse(courseName, user);

    // this means the course will be public and without a user linked to it
    if (isFeatured) {
      course.set("featured", isFeatured);
      course.set("likes", 0);
    }

    const resources = parseObjectsToJson(
      await getResourcesFromCourse(courseId)
    );

    if (!resources || resources.length === 0) {
      throw new Error("Course doesn't exist");
    }

    await course.save();

    for (const resource of resources) {
      const newResource = createResource({
        type: resource.type,
        status: "not started",
        videoId: resource.videoId,
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

    // We dont want to give positive feedback to resources if the user is making the course public
    !isFeatured && (await updateFeedbackForEveryResource(resources));
    return course;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateFeedbackForEveryResource = async (
  resources: (Parse.Object.ToJSON<Parse.Attributes> &
    Parse.JSONBaseAttributes)[]
) => {
  try {
    for (const resource of resources) {
      await updateFeedback(resource.videoId, SCORE_PER_SHARE);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
