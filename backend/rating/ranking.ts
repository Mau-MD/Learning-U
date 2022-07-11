import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import { ExpressError } from "../utils/errors";
import { parseISO, differenceInCalendarDays } from "date-fns";
import { normalize } from "../utils/math";
import {
  INormalizedYoutubeVideo,
  IRawYoutubeVideo,
  IWeightedYoutubeVideo,
} from "../types/youtube";

interface IMaxScores {
  dateXViews: number;
  dateXLikes: number;
}

const WEIGHTS = {
  w1: 60,
  w2: 40,
  w3: 100,
  w4: 0,
  w5: 100,
  w6: 0,
};

export const getExternalRanking = (videos: youtube_v3.Schema$Video[]) => {
  if (!ensureWeightsAreCorrect(WEIGHTS)) {
    new ExpressError("Ranking Weights are incorrect", 500);
  }

  const rawExternalScoreVideos = getRawExternalRanking(videos);
  const maxScores = getMaxScores(rawExternalScoreVideos);
  const normalizedExternalScoreVideos = getNormalizedExternalRanking(
    rawExternalScoreVideos,
    maxScores
  );
  return getWeightedExternalRanking(normalizedExternalScoreVideos);
};

const getRawExternalRanking = (
  videos: youtube_v3.Schema$Video[]
): IRawYoutubeVideo[] => {
  return videos.map((video) => {
    const daysSincePublished = getDaysSincePublished(video.snippet.publishedAt);
    const yearsSincePublished = daysSincePublished / 365;

    const rawDateScore = getDateScore(yearsSincePublished);
    const rawDateXViewsScore = getDateXViewsScore(
      parseInt(video.statistics.viewCount),
      yearsSincePublished
    );
    const rawDateXLikesScore = getDateXLikes(
      parseInt(video.statistics.likeCount),
      daysSincePublished
    );
    const useOfChapters = getUseOfChapters(video.snippet.description);

    return {
      ...video,
      raw_score: {
        date: rawDateScore,
        dateXViews: rawDateXViewsScore,
        dateXLikes: rawDateXLikesScore,
        useOfChapters,
      },
    };
  });
};

const getNormalizedExternalRanking = (
  videos: IRawYoutubeVideo[],
  maxScores: IMaxScores
): INormalizedYoutubeVideo[] => {
  return videos.map((video) => {
    return {
      ...video,
      normalized_score: {
        date: normalize(video.raw_score.date, 0, 10),
        dateXLikes: normalize(
          video.raw_score.dateXLikes,
          0,
          maxScores.dateXLikes
        ),
        dateXViews: normalize(
          video.raw_score.dateXViews,
          0,
          maxScores.dateXViews
        ),
        useOfChapters: video.raw_score.useOfChapters,
      },
    };
  });
};

const getWeightedExternalRanking = (
  videos: INormalizedYoutubeVideo[]
): IWeightedYoutubeVideo[] => {
  return videos.map((video) => {
    const weighted_score = {
      date: video.normalized_score.date * WEIGHTS.w1,
      dateXLikes: video.normalized_score.dateXLikes * WEIGHTS.w2,
      dateXViews: video.normalized_score.dateXViews * WEIGHTS.w3,
      useOfChapters: video.normalized_score.useOfChapters * WEIGHTS.w5,
    };

    const final_score =
      0.5 * (weighted_score.date + weighted_score.dateXLikes) +
      0.3 * weighted_score.dateXViews +
      0.2 * weighted_score.useOfChapters;

    return {
      ...video,
      weighted_score,
      final_score,
    };
  });
};

const getMaxScores = (
  rawExternalRankingVideos: IRawYoutubeVideo[]
): IMaxScores => {
  const maxScore = {
    dateXViews: 0,
    dateXLikes: 0,
  };

  for (const video of rawExternalRankingVideos) {
    maxScore.dateXViews = Math.max(
      maxScore.dateXViews,
      video.raw_score.dateXViews
    );
    maxScore.dateXLikes = Math.max(
      maxScore.dateXLikes,
      video.raw_score.dateXLikes
    );
  }

  return maxScore;
};

const getDateScore = (yearsSincePublished: number) => {
  // Following the function in https://docs.google.com/document/d/1zxYRyytmbbvfAZkQc8dampD9Vhun0XQtWepKYxWUTKo
  return Math.max(-Math.pow(1.6, yearsSincePublished) + 11, 0);
};

const getDateXViewsScore = (views: number, daysSincePublished: number) => {
  return views / daysSincePublished;
};

const getDateXLikes = (likes: number, daysSincePublished: number) => {
  return likes / daysSincePublished;
};

const getUseOfChapters = (description: string) => {
  const usesChapters = description.match("[0-9]:[0-9]");
  return usesChapters !== null ? 1 : 0;
};

const getChannelPopularity = () => {
  return 1;
};

const getDaysSincePublished = (publishedAt: string) => {
  const publishedAtDate = parseISO(publishedAt);
  const daysSincePublished = differenceInCalendarDays(
    new Date(),
    publishedAtDate
  );
  return daysSincePublished;
};

const ensureWeightsAreCorrect = (weights: typeof WEIGHTS) => {
  if (weights.w1 + weights.w2 !== 100) {
    return false;
  }
  if (weights.w3 + weights.w4 !== 100) {
    return false;
  }
  if (weights.w4 + weights.w6 !== 100) {
    new ExpressError("Weights are incorrect", 500);
    return false;
  }
  return true;
};
