import type { youtube_v3 } from "googleapis/build/src/apis/youtube/v3";
import { ExpressError } from "../utils/errors";

const WEIGHTS = {
  w1: 60,
  w2: 40,
  w3: 50,
  w4: 50,
  w5: 20,
  w6: 80,
};

export const getExternalRanking = (video: youtube_v3.Schema$Video) => {
  if (!ensureWeightsAreCorrect()) {
    new ExpressError("Ranking Weights are incorrect", 500);
  }
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
