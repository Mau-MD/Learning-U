import { getExternalRanking } from "../rating/ranking";
import { getVideoDetailByIds, getVideosByQuery } from "../rating/youtube";

const VIDEOS_PER_QUERY = 100;

export const createCourse = (name: string) => {
  const Course: Parse.Object = new Parse.Object("Course");
  Course.set("name", name);
  return Course;
};

export const generateResources = async (name: string) => {
  const rankedBeginner = await getTop3ByDifficulty(name, "beginner");
  const rankedIntermediate = await getTop3ByDifficulty(name, "intermediate");
  const rankedAdvanced = await getTop3ByDifficulty(name, "advanced");
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
