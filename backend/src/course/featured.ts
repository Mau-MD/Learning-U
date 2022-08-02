// A featured course is just a

import { quartersInYear } from "date-fns";
import Parse from "parse/node";
import {
  checkIfUrlIsValidAndReturnId,
  getVideoDetailByIds,
} from "../rating/youtube";
import { createResource } from "../resources/resources";
import { parseObjectToJson } from "../utils/parseToJason";
import { cloneCourse } from "./clone";
import { createCourse, getCourseByUserAndId } from "./course";
import { getLikesUser, incrementCourseLikes } from "./likes";

export const makeAnExistingCourseFeautured = async (
  courseId: string,
  user: Parse.User<Parse.Attributes>
) => {
  const course = await getCourseByUserAndId(user, courseId);

  const featuredCourse = await cloneCourse(
    course.get("name"),
    courseId,
    user,
    true
  );

  return featuredCourse;
};

export const getAllFeaturedCourses = async (
  limit: number,
  skip: number,
  searchQuery: string,
  user: Parse.User<Parse.Attributes>
) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("featured", true);
  query.descending("likes");
  query.matches("name", new RegExp(searchQuery), "i");
  query.limit(limit);
  query.skip(skip);
  query.include("user");

  const courses = await query.find();

  return mapIfUserHasLikedBefore(courses, user);
};

export const mapIfUserHasLikedBefore = async (
  courses: Parse.Object<Parse.Attributes>[],
  user: Parse.Object<Parse.Attributes>
) => {
  // cannot use map since it doesn't support async await
  const likedCourses = [];
  for (const course of courses) {
    const likedByUser = await getLikesUser(user, course);
    likedCourses.push({
      ...parseObjectToJson(course),
      likedByUser: !!likedByUser,
    });
  }
  return likedCourses;
};

export const createCourseFromScratch = async (
  urls: string[],
  name: string,
  user: Parse.User<Parse.Attributes>
) => {
  const course = await createCourse(name, user);
  course.set("featured", true);
  course.set("likes", 0);

  await course.save();

  const videosIds = urls.map((url) => checkIfUrlIsValidAndReturnId(url));

  const videoDetails = await getVideoDetailByIds(videosIds, 100);

  for (const [idx, details] of videoDetails.data.items.entries()) {
    const video = createResource({
      type: "video",
      level: idx < 3 ? 1 : 2,
      videoId: details.id,
      status: "not started",
      title: details.snippet.title,
      description: details.snippet.description,
      url: `https://youtube.com/video/${details.id}`,
      thumbnail: details.snippet.thumbnails.high.url,
      channel: details.snippet.channelTitle,
      feedback: 0,
      course,
      user,
    });

    await video.save();
  }

  return videoDetails;
};

export const likeFeaturedCourse = async (
  courseId: string,
  user: Parse.User<Parse.Attributes>
) => {
  const LikeUser = new Parse.Object("LikeUser");

  const Course = new Parse.Object("Course");
  Course.set("objectId", courseId);

  const hasBeenLikedBefore = await getLikesUser(user, Course);
  if (hasBeenLikedBefore) {
    throw new Error("You already liked this course");
  }

  LikeUser.set("course", Course);
  LikeUser.set("user", user);

  await LikeUser.save();
  return await incrementCourseLikes(Course, 1);
};

export const dislikeFeaturedCourse = async (
  courseId: string,
  user: Parse.User<Parse.Attributes>
) => {
  const Course = new Parse.Object("Course");
  Course.set("objectId", courseId);

  const likeUser = await getLikesUser(user, Course);

  if (!likeUser) {
    throw new Error("You haven't like this course before");
  }

  await likeUser.destroy();
  return await incrementCourseLikes(Course, -1);
};
