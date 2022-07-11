import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import { ExpressError } from "../utils/errors";
import { parseISO, differenceInCalendarDays } from "date-fns";
import { normalize } from "../utils/math";

interface ExternalRankingParams {
  wwwwww;
}

const WEIGHTS = {
  w1: 60,
  w2: 40,
  w3: 50,
  w4: 50,
  w5: 20,
  w6: 80,
};

export const getExternalRanking = (videos: youtube_v3.Schema$Video[]) => {
  if (!ensureWeightsAreCorrect()) {
    new ExpressError("Ranking Weights are incorrect", 500);
  }

  return getRawExternalRanking(videos);
};

const getRawExternalRanking = (videos: youtube_v3.Schema$Video[]) => {
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
      title: video.snippet.title,
      description: video.snippet.description,
      raw_score: {
        date: rawDateScore,
        dateXViews: rawDateXViewsScore,
        dateXLikes: rawDateXLikesScore,
        useOfChapters,
      },
    };
  });
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
  return usesChapters !== null;
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

const ensureWeightsAreCorrect = () => {
  if (WEIGHTS.w1 + WEIGHTS.w2 !== 100) {
    return false;
  }
  if (WEIGHTS.w3 + WEIGHTS.w4 !== 100) {
    return false;
  }
  if (WEIGHTS.w4 + WEIGHTS.w6 !== 100) {
    new ExpressError("Weights are incorrect", 500);
    return false;
  }
  return true;
};
