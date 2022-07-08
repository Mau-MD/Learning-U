import express, { Request } from "express";
import { getVideoDetailByIds, getVideosByQuery } from "../rating/youtube";
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

export default debug;
