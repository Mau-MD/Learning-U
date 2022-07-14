import { getExternalRanking } from "../rating/ranking";
import { getVideoDetailByIds, getVideosByQuery } from "../rating/youtube";
import Parse from "parse/node";
import { IResource } from "../types/resource";
import { IWeightedYoutubeVideo } from "../types/youtube";

const VIDEOS_PER_QUERY = 100;

export const getUserCourses = async (user: Parse.Object<Parse.Attributes>) => {
  const Course = Parse.Object.extend("Course");
  const query = new Parse.Query(Course);

  query.equalTo("user", user);

  const courses = await query.findAll();

  return courses;
};

export const createCourse = (
  name: string,
  user: Parse.Object<Parse.Attributes>
) => {
  const Course: Parse.Object = new Parse.Object("Course");
  Course.set("name", name);
  Course.set("user", user);
  return Course;
};

export const createResource = (resource: IResource) => {
  const Resource: Parse.Object = new Parse.Object("Resource");

  Object.keys(resource).forEach((resourceAttribute) => {
    Resource.set(resourceAttribute, resource[resourceAttribute]);
  });

  return Resource;
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
      status: "not started",
      title: resource.snippet.title,
      description: resource.snippet.description,
      url: `https://youtube.com/video/${resource.id}`,
      thumbnail: resource.snippet.thumbnails.default.url,
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

  const rankedVideos = getExternalRanking(videosDetailed.data.items);
  const sortedRankedVideos = rankedVideos.sort(
    (a, b) => b.final_score - a.final_score
  );

  return sortedRankedVideos;
};
