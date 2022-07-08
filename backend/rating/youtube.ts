import youtube from "../utils/gapi";

export const getVideosByQuery = (query: string) => {
  const result = youtube.search.list({ q: query });
  return result;
};
