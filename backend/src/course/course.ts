import {
  getExternalRanking,
  getFinalRanking,
  getInternalRanking,
} from "../rating/ranking";
import { getVideoDetailByIds, getVideosByQuery } from "../rating/youtube";
import Parse from "parse/node";
import { IResource } from "../types/resource";
import { IWeightedYoutubeVideo } from "../types/youtube";
import { createResource } from "../resources/resources";
import { getImagesByQuery } from "../unsplash/unsplash";
import { updateFeedback } from "../feedback/feedback";

const VIDEOS_PER_QUERY = 100;
const SCORE_PER_DISLIKED_VIDEO = -2;

export const getUserCourses = async (user: Parse.Object<Parse.Attributes>) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);

  const courses = await query.findAll();

  return courses;
};

export const getCourseByUserAndId = async (
  user: Parse.Object<Parse.Attributes>,
  courseId: string
) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);
  query.equalTo("objectId", courseId);

  const course = await query.find();

  return course[0];
};

export const getProgressByCourse = async (
  user: Parse.Object<Parse.Attributes>,
  courseId: string
) => {
  const Resource = Parse.Object.extend("Resource");
  const Course = Parse.Object.extend("Course");

  const query = new Parse.Query(Resource);

  const course = new Course();
  course.id = courseId;

  query.equalTo("user", user);
  query.equalTo("course", course);

  const resources = await query.findAll();

  // filter by level
  const beginnerLevelResources = resources.filter(
    (resource) => resource.get("level") === 1
  );
  const advancedLevelResources = resources.filter(
    (resource) => resource.get("level") === 2
  );

  return {
    1: calculateCourseCompletition(beginnerLevelResources),
    2: calculateCourseCompletition(advancedLevelResources),
  };
};

export const createCourse = async (
  name: string,
  user: Parse.Object<Parse.Attributes>
) => {
  const Course: Parse.Object = new Parse.Object("Course");

  const images = await getImagesByQuery(name);

  Course.set("name", name);
  Course.set("images", images);
  Course.set("user", user);
  return Course;
};

export const deleteCourse = async (
  courseId: string,
  dislikedVideos: string[]
) => {
  const Course = new Parse.Object("Course");
  Course.set("objectId", courseId);

  giveNegativeFeedbackToDislikedVideos(dislikedVideos);
  return await Course.destroy();
};

export const giveNegativeFeedbackToDislikedVideos = async (
  dislikedVideos: string[]
) => {
  for (const dislikedVideo of dislikedVideos) {
    await updateFeedback(dislikedVideo, SCORE_PER_DISLIKED_VIDEO);
  }
};

export const saveResources = async (
  resources: IWeightedYoutubeVideo[],
  course: Parse.Object<Parse.Attributes>,
  level: 1 | 2,
  user: Parse.User<Parse.Attributes>
) => {
  for (const resource of resources) {
    const video = createResource({
      type: "video",
      level,
      videoId: resource.id,
      status: "not started",
      title: resource.snippet.title,
      description: resource.snippet.description,
      url: `https://youtube.com/video/${resource.id}`,
      thumbnail: resource.snippet.thumbnails.high.url,
      channel: resource.snippet.channelTitle,
      feedback: 0,
      course,
      user,
    });

    await video.save();
  }
};

export const generateResources = async (name: string) => {
  const rankedBeginner = await getTop3ByDifficulty(name, "beginner");
  const rankedAdvanced = await getTop3ByDifficulty(name, "advanced");

  return {
    beginner: rankedBeginner,
    advanced: rankedAdvanced,
  };
};

const getTop3ByDifficulty = async (query: string, difficulty: string) => {
  const rankedVideos = await getRankedVideos(`${difficulty} ${query} tutorial`);
  const splicedRankedVideos = rankedVideos.splice(0, 3);
  return splicedRankedVideos;
};

const getRankedVideos = async (query: string) => {
  const videos = await getVideosByQuery(query, VIDEOS_PER_QUERY);

  const ids = [];
  for (const video of videos.data.items) {
    ids.push(video.id.videoId);
  }

  const videosDetailed = await getVideoDetailByIds(ids, VIDEOS_PER_QUERY);

  const rankedVideos = await getFinalRanking(videosDetailed.data.items);

  const sortedRankedVideos = rankedVideos.sort(
    (a, b) => b.final_score - a.final_score
  );

  return sortedRankedVideos;
};

const calculateCourseCompletition = (
  resources: Parse.Object<Parse.Attributes>[]
) => {
  let totalCompleted = 0;
  let totalInProgress = 0;

  for (const resource of resources) {
    if (resource.get("status") === "completed") totalCompleted++;
    if (resource.get("status") === "in progress") totalInProgress++;
  }

  return ((totalCompleted + 0.5 * totalInProgress) / resources.length) * 100;
};
