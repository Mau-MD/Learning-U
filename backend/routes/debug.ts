import express, { Request } from "express";
import { youtube_v3 } from "googleapis";
import { getExternalRanking } from "../rating/ranking";
import {
  getVideoDataFromJson,
  getVideoDetailByIds,
  getVideosByQuery,
} from "../rating/youtube";
import { BadRequestError } from "../utils/errors";

const debug = express.Router();

const VIDEOS_PER_QUERY = 100;

debug.post("/", async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    next(new BadRequestError("query is missing"));
    return;
  }

  const videos = await getVideosByQuery(query, VIDEOS_PER_QUERY);

  const ids = [];
  for (const video of videos.data.items) {
    ids.push(video.id.videoId);
  }

  const videosDetailed = await getVideoDetailByIds(ids, VIDEOS_PER_QUERY);

  res.send(videosDetailed.data.items);
});

debug.get("/json", (req, res, next) => {
  const videos = getVideoDataFromJson() as youtube_v3.Schema$Video[];
  const rankedVideos = getExternalRanking(videos);
  res.send(
    rankedVideos.map((video) => {
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        raw_score: video.raw_score,
        normalized_score: video.normalized_score,
        weighted_score: video.weighted_score,
        final_score: video.final_score,
      };
    })
  );
});
export default debug;
