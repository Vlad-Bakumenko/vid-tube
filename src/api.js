const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_API_KEY;

const get = async (endpoint, params, signal) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`YouTube API error: ${response.status}`);
  return response.json();
};

export const getPopularVideos = (categoryId, signal) =>
  get("videos", {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    maxResults: 50,
    regionCode: "US",
    videoCategoryId: categoryId,
  }, signal);

export const getVideoById = (videoId, signal) =>
  get("videos", {
    part: "snippet,contentDetails,statistics",
    id: videoId,
  }, signal);

export const getChannelById = (channelId, signal) =>
  get("channels", {
    part: "snippet,contentDetails,statistics",
    id: channelId,
  }, signal);

export const getComments = (videoId, signal) =>
  get("commentThreads", {
    part: "snippet,replies",
    videoId,
  }, signal);

export const searchVideos = (query, signal) =>
  get("search", {
    part: "snippet",
    maxResults: 25,
    q: query,
  }, signal);
