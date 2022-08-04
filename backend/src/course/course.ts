import {
  getExternalRanking,
  getFinalRanking,
  getInternalRanking,
} from "../rating/ranking";
import { getVideoDetailByIds, getVideosByQuery } from "../rating/youtube";
import Parse from "parse/node";
import { IResource } from "../types/resource";
import {
  IFinalRankingYoutubeVideo,
  IWeightedYoutubeVideo,
} from "../types/youtube";
import { createResource } from "../resources/resources";
import { getImagesByQuery } from "../unsplash/unsplash";
import { updateFeedback } from "../feedback/feedback";
import { CourseDifficulty } from "../types/course";

const VIDEOS_PER_QUERY = 100;
const SCORE_PER_DISLIKED_VIDEO = -2;

export const getUserCourses = async (user: Parse.Object<Parse.Attributes>) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);
  query.notEqualTo("featured", true);

  try {
    const courses = await query.findAll();

    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUserCoursesWithLimits = async (
  user: Parse.Object<Parse.Attributes>,
  limit: number,
  skip: number,
  searchQuery: string
) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);
  query.descending("createdAt");
  query.matches("name", new RegExp(searchQuery), "i");
  query.limit(limit);
  query.notEqualTo("featured", true);
  query.skip(skip);

  try {
    const courses = await query.find();
    return courses;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCourseByUserAndId = async (
  user: Parse.Object<Parse.Attributes>,
  courseId: string
) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);
  query.equalTo("objectId", courseId);

  try {
    const course = await query.find();

    return course[0];
  } catch (err) {
    throw new Error(err.message);
  }
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

  try {
    const resources = await query.findAll();

    // filter by level
    const beginnerLevelResources = resources.filter(
      (resource) => resource.get("level") === CourseDifficulty.Beginner
    );
    const advancedLevelResources = resources.filter(
      (resource) => resource.get("level") === CourseDifficulty.Advanced
    );

    return {
      [CourseDifficulty.Beginner]: calculateCourseCompletition(
        beginnerLevelResources
      ),
      [CourseDifficulty.Advanced]: calculateCourseCompletition(
        advancedLevelResources
      ),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createCourse = async (
  name: string,
  user: Parse.Object<Parse.Attributes>
) => {
  const Course: Parse.Object = new Parse.Object("Course");

  try {
    const images = await getImagesByQuery(name);

    Course.set("name", name);
    Course.set("images", images);
    Course.set("user", user);
    return Course;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteCourse = async (
  courseId: string,
  dislikedVideos: string[]
) => {
  const Course = new Parse.Object("Course");
  Course.set("objectId", courseId);

  try {
    await giveNegativeFeedbackToDislikedVideos(dislikedVideos);
    return await Course.destroy();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const giveNegativeFeedbackToDislikedVideos = async (
  dislikedVideos: string[]
) => {
  try {
    for (const dislikedVideo of dislikedVideos) {
      await updateFeedback(dislikedVideo, SCORE_PER_DISLIKED_VIDEO);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const saveResources = async (
  resources: IWeightedYoutubeVideo[],
  course: Parse.Object<Parse.Attributes>,
  level: CourseDifficulty,
  user: Parse.User<Parse.Attributes>
) => {
  try {
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
  } catch (err) {
    throw new Error(err.message);
  }
};

export const generateResources = async (name: string) => {
  try {
    return await getBeginnerAndAdvancedCourses(name);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBeginnerAndAdvancedCourses = async (query: string) => {
  const VIDEOS_PER_COURSE = 3;
  try {
    const beginnerVideos = await getRankedVideos(`beginner ${query} tutorial`);
    const top3AdvancedVideos = getTopN(
      await getRankedVideos(`advanced ${query} tutorial`),
      VIDEOS_PER_COURSE
    );
    const top3BeginnerVideos = getTopNBeginnerVideosWithoutDuplicates(
      beginnerVideos,
      top3AdvancedVideos,
      VIDEOS_PER_COURSE
    );
    return {
      beginner: top3BeginnerVideos,
      advanced: top3AdvancedVideos,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getTopNBeginnerVideosWithoutDuplicates = (
  beginnerVideos: IFinalRankingYoutubeVideo[],
  top3AdvancedVideos: IFinalRankingYoutubeVideo[],
  n: number
) => {
  const selectedBeginnerVideos = new Set();

  const topNBeginnersVideos: IFinalRankingYoutubeVideo[] = [];

  // We have to iterate over all videos. And then break as soon as we have 3
  for (const video of beginnerVideos) {
    if (top3AdvancedVideos.find((v) => v.id === video.id)) {
      continue;
    }
    topNBeginnersVideos.push(video);
    if (topNBeginnersVideos.length === n) break;
  }
  return topNBeginnersVideos;
};

const getTopN = (rankedVideos: IFinalRankingYoutubeVideo[], n: number) => {
  if (n > rankedVideos.length) {
    return rankedVideos;
  }

  const splicedRankedVideos = rankedVideos.splice(0, n);
  return splicedRankedVideos;
};

const getRankedVideos = async (query: string) => {
  try {
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
  } catch (err) {
    throw new Error(err.message);
  }
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
