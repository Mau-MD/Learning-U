export const truncate = (str: string, maxSize: number) => {
  if (str.length > maxSize) {
    return str.slice(0, maxSize) + "...";
  }
  return str;
};
