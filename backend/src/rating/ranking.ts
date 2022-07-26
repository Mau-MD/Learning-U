import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import { ExpressError } from "../utils/errors";
import { parseISO, differenceInCalendarDays } from "date-fns";
import { normalize } from "../utils/math";
import {
  IFinalRankingYoutubeVideo,
  INormalizedInternalYoutubeVideo,
  INormalizedYoutubeVideo,
  IRawYoutubeVideo,
  IWeightedYoutubeVideo,
} from "../types/youtube";
import {
  assignFeedbackScoreToFetchedVideos,
  getFeedback,
} from "../feedback/feedback";

interface IMaxScores {
  dateXViews: number;
  dateXLikes: number;
}

/*
Youtube Video Ranking Algorithm
For more information: https://docs.google.com/document/d/1zxYRyytmbbvfAZkQc8dampD9Vhun0XQtWepKYxWUTKo/edit?usp=sharing

This algorithm starts at `getExternalRanking` and where it first gets the raw score for each of the videos that were passed in the function. For every `ranking-features` it uses the formula described in 
the document above.

Then, since we cannot have raw scores, we have to normalize then. Since normalizing requires a minimum and a maximum, we need to find the maximum raw score for each features. `getMaxScores` does that.
After that, we normalize all `ranking-features` with the information we got before.
Finally, we apply weights to each `ranking-feature` so it matches the formula proposed before. We sum everything up, and that's our final score that will be used to rank the videos
*/

export const WEIGHTS = {
  weight1: 60,
  weight2: 40,
  weight3: 100,
  weight4: 0,
  weight5: 100,
  weight6: 0,
};

export const getFinalRanking = async (videos: youtube_v3.Schema$Video[]) => {
  const externalRankedVideos = getExternalRanking(videos);
  const internalRankedVideos = await getInternalRanking(videos);
  return mergeInternalExternalRanking(
    externalRankedVideos,
    internalRankedVideos
  );
};

export const getInternalRanking = async (videos: youtube_v3.Schema$Video[]) => {
  const feedback = await getFeedback();
  return assignFeedbackScoreToFetchedVideos(videos, feedback);
};

export const mergeInternalExternalRanking = (
  externalRankedVideos: IWeightedYoutubeVideo[],
  internalRankedVideos: INormalizedInternalYoutubeVideo[]
): IFinalRankingYoutubeVideo[] => {
  if (externalRankedVideos.length !== internalRankedVideos.length) {
    throw new Error("External and internal ranking doesn't match");
  }
  return externalRankedVideos.map((externalVideo, idx) => {
    const final_score =
      0.4 * externalVideo.final_external_score +
      0.6 * internalRankedVideos[idx].internal_score;
    return { ...externalVideo, ...internalRankedVideos[idx], final_score };
  });
};

export const getExternalRanking = (videos: youtube_v3.Schema$Video[]) => {
  const rawExternalScoreVideos = getRawExternalRanking(videos);
  const maxScores = getMaxScores(rawExternalScoreVideos);
  const normalizedExternalScoreVideos = getNormalizedExternalRanking(
    rawExternalScoreVideos,
    maxScores
  );
  return getWeightedExternalRanking(normalizedExternalScoreVideos);
};

export const getRawExternalRanking = (
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

export const getNormalizedExternalRanking = (
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

export const getWeightedExternalRanking = (
  videos: INormalizedYoutubeVideo[]
): IWeightedYoutubeVideo[] => {
  return videos.map((video) => {
    const weighted_score = {
      date: video.normalized_score.date * WEIGHTS.weight1,
      dateXLikes: video.normalized_score.dateXLikes * WEIGHTS.weight2,
      dateXViews: video.normalized_score.dateXViews * WEIGHTS.weight3,
      useOfChapters: video.normalized_score.useOfChapters * WEIGHTS.weight5,
    };

    const final_external_score =
      0.5 * (weighted_score.date + weighted_score.dateXLikes) +
      0.3 * weighted_score.dateXViews +
      0.2 * weighted_score.useOfChapters;

    return {
      ...video,
      weighted_score,
      final_external_score,
    };
  });
};

export const getMaxScores = (
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

export const getDateScore = (yearsSincePublished: number) => {
  // Following the function in https://docs.google.com/document/d/1zxYRyytmbbvfAZkQc8dampD9Vhun0XQtWepKYxWUTKo
  return Math.max(-Math.pow(1.6, yearsSincePublished) + 11, 0);
};

export const getDateXViewsScore = (
  views: number,
  daysSincePublished: number
) => {
  return views / daysSincePublished;
};

export const getDateXLikes = (likes: number, daysSincePublished: number) => {
  return likes / daysSincePublished;
};

export const getUseOfChapters = (description: string) => {
  const usesChapters = description.match("[0-9]:[0-9]");
  return usesChapters !== null ? 1 : 0;
};

export const getDaysSincePublished = (publishedAt: string) => {
  const publishedAtDate = parseISO(publishedAt);
  const daysSincePublished = differenceInCalendarDays(
    new Date(),
    publishedAtDate
  );
  return daysSincePublished;
};
