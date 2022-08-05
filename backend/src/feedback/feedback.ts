import { youtube_v3 } from "googleapis";
import Parse from "parse/node";
import {
  INormalizedInternalYoutubeVideo,
  IRawInternalYoutubeVideo,
} from "../types/youtube";
import { normalize } from "../utils/math";

export const createFeedback = (videoId: string, feedback: number) => {
  const Feedback = new Parse.Object("Feedback");
  Feedback.set("videoId", videoId);
  Feedback.set("feedback", feedback);
  return Feedback;
};

export const updateFeedback = async (
  videoId: string,
  amountToIncrement: number
) => {
  try {
    const feedback = await getFeedbackByVideoId(videoId);

    if (!feedback || feedback.length === 0) {
      const newFeedbackObject = createFeedback(videoId, amountToIncrement);
      return await newFeedbackObject.save();
    }

    feedback[0].increment("feedback", amountToIncrement);
    return await feedback[0].save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getFeedbackByVideoId = async (videoId: string) => {
  const Feedback = Parse.Object.extend("Feedback");
  const query = new Parse.Query(Feedback);

  query.equalTo("videoId", videoId);
  try {
    const feedback = await query.find();
    return feedback;
  } catch (err) {
    throw new Error(err.message);
  }
};
export const getFeedback = async () => {
  const Feedback = Parse.Object.extend("Feedback");
  const query = new Parse.Query(Feedback);

  try {
    const feedback = await query.find();
    return feedback;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const assignFeedbackScoreToFetchedVideos = (
  videos: youtube_v3.Schema$Video[],
  feedback: Parse.Object<Parse.Attributes>[]
) => {
  const rawFeedbackVideos = assignRawFeedbackScoreToFetchedVideos(
    videos,
    feedback
  );
  const { minScore, maxScore } = getMaxMinFeedbackScore(rawFeedbackVideos);
  return normalizeFeedbackFromFetchedVideos(
    rawFeedbackVideos,
    minScore,
    maxScore
  );
};

export const assignRawFeedbackScoreToFetchedVideos = (
  videos: youtube_v3.Schema$Video[],
  feedback: Parse.Object<Parse.Attributes>[]
): IRawInternalYoutubeVideo[] => {
  return videos.map((video) => {
    const videoInFeedback = feedback.find((f) => f.get("videoId") === video.id);

    if (!videoInFeedback) return { ...video, raw_internal_score: 0 };
    return { ...video, raw_internal_score: videoInFeedback.get("feedback") };
  });
};

export const getMaxMinFeedbackScore = (videos: IRawInternalYoutubeVideo[]) => {
  let maxFeedbackScore = videos[0].raw_internal_score;
  let minFeedbackScore = videos[0].raw_internal_score;

  for (const video of videos) {
    maxFeedbackScore = Math.max(video.raw_internal_score, maxFeedbackScore);
    minFeedbackScore = Math.min(video.raw_internal_score, minFeedbackScore);
  }
  return { minScore: minFeedbackScore, maxScore: maxFeedbackScore };
};

export const normalizeFeedbackFromFetchedVideos = (
  videos: IRawInternalYoutubeVideo[],
  minInternalFeedbackScore: number,
  maxInternalFeedbackScore: number
): INormalizedInternalYoutubeVideo[] => {
  return videos.map((video) => {
    return {
      ...video,
      internal_score:
        normalize(
          video.raw_internal_score,
          minInternalFeedbackScore,
          maxInternalFeedbackScore
        ) * 100,
    };
  });
};
