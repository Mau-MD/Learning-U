import express, { Request } from "express";
import { run_v1, youtube_v3 } from "googleapis";
import {
  getExternalRanking,
  getFinalRanking,
  getInternalRanking,
} from "../rating/ranking";
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

  try {
    const videos = await getVideosByQuery(query, VIDEOS_PER_QUERY);

    const ids = videos.data.items.map((video) => {
      return video.id.videoId;
    });

    const videosDetailed = await getVideoDetailByIds(ids, VIDEOS_PER_QUERY);

    res.send(videosDetailed.data.items);
  } catch (err) {
    next(new BadRequestError(err.message));
  }
});

debug.get("/internal", async (req, res, next) => {
  const videos = getVideoDataFromJson() as youtube_v3.Schema$Video[];
  try {
    const rankedVideos = await getFinalRanking(videos);
    res.send(
      rankedVideos.map((video) => {
        return {
          title: video.snippet.title,
          description: video.snippet.description,
          raw_score: video.raw_score,
          normalized_score: video.normalized_score,
          weighted_score: video.weighted_score,
          final_external_score: video.final_external_score,
          raw_internal_score: video.raw_internal_score,
          final_internal_score: video.internal_score,
          final_score: video.final_score,
        };
      })
    );
  } catch (err) {
    next(new BadRequestError(err.message));
  }
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
        final_score: video.final_external_score,
      };
    })
  );
});
export default debug;
