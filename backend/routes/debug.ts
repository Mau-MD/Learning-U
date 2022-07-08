import express, { Request } from "express";
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
  const videos = getVideoDataFromJson();
  getExternalRanking(videos[0]);
  res.send(videos);
});
export default debug;
