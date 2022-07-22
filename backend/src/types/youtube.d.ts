import { youtube_v3 } from "googleapis";

export interface IExternalRankingScore {
  date: number;
  dateXViews: number;
  dateXLikes: number;
  useOfChapters: number;
}

export interface IRawYoutubeVideo extends youtube_v3.Schema$Video {
  raw_score: IExternalRankingScore;
}

export interface INormalizedYoutubeVideo extends IRawYoutubeVideo {
  normalized_score: IExternalRankingScore;
}

export interface IWeightedYoutubeVideo extends INormalizedYoutubeVideo {
  weighted_score: IExternalRankingScore;
  final_external_score: number;
}

export interface IRawInternalYoutubeVideo extends youtube_v3.Schema$Video {
  raw_internal_score: number;
}

export interface INormalizedInternalYoutubeVideo
  extends IRawInternalYoutubeVideo {
  internal_score: number;
}

export type IFinalRankingYoutubeVideo = INormalizedInternalYoutubeVideo &
  IWeightedYoutubeVideo & { final_score: number };
