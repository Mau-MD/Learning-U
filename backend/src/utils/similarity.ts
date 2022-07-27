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
