export const getBigrams = (str: string) => {
  const bigrams = new Set<string>();
  for (let i = 0; i < str.length - 1; i++) {
    bigrams.add(str.substring(i, i + 2));
  }
  return bigrams;
};

export const intersectTwoSets = <T>(set1: Set<T>, set2: Set<T>) => {
  return new Set([...set1].filter((x) => set2.has(x)));
};

export const getDiceCoefficient = (str1: string, str2: string) => {
  const s1 = str1.replace(/\s/g, "").toLowerCase();
  const s2 = str2.replace(/\s/g, "").toLowerCase();

  const bigrams1 = getBigrams(s1);
  const bigrams2 = getBigrams(s2);
  return (
    (2 * intersectTwoSets(bigrams1, bigrams2).size) /
    (bigrams1.size + bigrams2.size)
  );
};

export const getCosineSimilarity = (str1: string, str2: string) => {
  const s1WordList = str1.toLowerCase().split(" ");
  const s2WordList = str2.toLowerCase().split(" ");

  const str1Frequency = countWordFrequency(s1WordList);
  const str2Frequency = countWordFrequency(s2WordList);

  const wordsSet = getWordsSet([...s1WordList, ...s2WordList]);

  const s1Vector = mapTermFrequencyToVector(str1Frequency, wordsSet);
  const s2Vector = mapTermFrequencyToVector(str2Frequency, wordsSet);

  return cosineSimilarity(s1Vector, s2Vector);
};

export const cosineSimilarity = (vectorA: number[], vectorB: number[]) => {
  return (
    vectorDotProduct(vectorA, vectorB) /
    (vectorMagnitude(vectorA) * vectorMagnitude(vectorB))
  );
};

export const countWordFrequency = (
  strWords: string[]
): { [key: string]: number } => {
  const frequency = {};

  for (const word of strWords) {
    frequency[word] = (frequency[word] || 0) + 1; // Ensure it exists and then add 1
  }
  return frequency;
};

export const getWordsSet = (words: string[]) => {
  const wordsSet = new Set<string>();
  for (const word of words) {
    wordsSet.add(word);
  }
  return wordsSet;
};

export const vectorDotProduct = (vectorA: number[], vectorB: number[]) => {
  let product = 0;
  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i];
  }
  return product;
};

export const vectorMagnitude = (vectorA: number[]) => {
  const sum = vectorA.reduce((prev, curr) => prev + curr * curr, 0);
  return Math.sqrt(sum);
};

export const mapTermFrequencyToVector = (
  strFrequency: {
    [key: string]: number;
  },
  totalWordsSet: Set<string>
) => {
  const vector: number[] = [];
  for (const word of totalWordsSet) {
    vector.push(strFrequency[word] || 0);
  }
  return vector;
};

export const getStringSimilarity = (str1: string, str2: string) => {
  const DICE_WEIGHT = 0.5;
  const COSINE_WEIGHT = 0.5;

  const diceScore = getDiceCoefficient(str1, str2);
  const cosineScore = getCosineSimilarity(str1, str2);

  return DICE_WEIGHT * diceScore + COSINE_WEIGHT * cosineScore;
};
