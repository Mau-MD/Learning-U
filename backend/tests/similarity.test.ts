import {
  cosineSimilarity,
  getDiceCoefficient,
  getBigrams,
  getCosineSimilarity,
  intersectTwoSets,
} from "../src/utils/similarity";

test("should get all bigrams of a string", () => {
  const str1 = "hello world";
  const expectedSet = new Set([
    "he",
    "el",
    "ll",
    "lo",
    "o ",
    " w",
    "wo",
    "or",
    "rl",
    "ld",
  ]);
  expect(getBigrams(str1)).toStrictEqual(expectedSet);
});

test("should intersect two sets", () => {
  const set1 = new Set(["hello", "yes"]);
  const set2 = new Set(["hello", "no"]);
  const expectedSet = new Set(["hello"]);

  expect(intersectTwoSets(set1, set2)).toStrictEqual(expectedSet);
});

test("should get the diceCoefficient of two string", () => {
  const str1 = "vue";
  const str2 = "vue js";
  const expectedResult = 1.0;

  expect(getDiceCoefficient(str1, str2)).toBeCloseTo(0.666);
});

test("get cosine similarity ", () => {
  const str1 = "Julie loves me more than Linda loves me";
  const str2 = "Jane likes me more than Julie loves me";
  expect(getCosineSimilarity(str1, str2)).toBeCloseTo(0.822);
});
