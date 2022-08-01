import { readFileSync } from "fs";
import path from "path";
import youtube from "../utils/gapi";

export const getVideosByQuery = async (query: string, limit: number) => {
  const result = await youtube.search.list({
    q: query,
    part: ["id"],
    type: ["video"],
    maxResults: limit,
  });
  return result;
};

export const getVideoDetailByIds = async (ids: string[], limit: number) => {
  const result = await youtube.videos.list({
    id: ids,
    part: ["snippet", "contentDetails", "statistics"],
    maxResults: limit,
  });
  return result;
};

export const getVideoDataFromJson = () => {
  const jsonPath = path.join(__dirname, "youtube-data.json");
  return JSON.parse(readFileSync(jsonPath, { encoding: "utf-8" }));
};

export const checkIfUrlIsValidAndReturnId = (url: string) => {
  var youtubeRegExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  const matches = url.match(youtubeRegExp);

  if (matches) return matches[2];
  return undefined;
};
