import { ensureWeightsAreCorrect, getDaysSincePublished } from "./ranking";

test("weights should throw an error if weights are incorrect", () => {
  const testWeights1 = {
    w1: 60,
    w2: 40,
    w3: 100,
    w4: 0,
    w5: 100,
    w6: 0,
  };

  expect(ensureWeightsAreCorrect(testWeights1)).toBe(true);

  const testWeights2 = {
    w1: 60,
    w2: 40,
    w3: 100,
    w4: 0,
    w5: 100,
    w6: 10,
  };

  expect(ensureWeightsAreCorrect(testWeights2)).toBe(false);
});

test("should return the days that have passed since then, given an ISO Date", () => {
  const publishedAt = "2018-07-16T16:51:44Z";
  expect(getDaysSincePublished(publishedAt)).toBe(1456);
  expect(getDaysSincePublished(new Date().toISOString())).toBe(0);
});
