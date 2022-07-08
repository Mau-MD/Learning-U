import youtube from "../utils/gapi";

export const getVideosByQuery = (query: string) => {
  const result = youtube.search.list({ q: query });
  return result;
};

export const getVideoDetailByIds = (ids: string[]) => {
  const result = youtube.videos.list({ id: ids });
  return result;
};
