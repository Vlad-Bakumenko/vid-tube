import type { VideoItem, ChannelItem, CommentThread, SearchResultItem } from './types';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_API_KEY as string;

interface ApiResponse<T> {
  items: T[];
}

const get = async <T>(
  endpoint: string,
  params: Record<string, string | number>,
  signal?: AbortSignal
): Promise<ApiResponse<T>> => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set('key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`YouTube API error: ${response.status}`);
  return response.json();
};

export const getPopularVideos = (categoryId: number, signal?: AbortSignal) =>
  get<VideoItem>('videos', {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'US',
    videoCategoryId: categoryId,
  }, signal);

export const getVideoById = (videoId: string, signal?: AbortSignal) =>
  get<VideoItem>('videos', {
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  }, signal);

export const getChannelById = (channelId: string, signal?: AbortSignal) =>
  get<ChannelItem>('channels', {
    part: 'snippet,contentDetails,statistics',
    id: channelId,
  }, signal);

export const getComments = (videoId: string, signal?: AbortSignal) =>
  get<CommentThread>('commentThreads', {
    part: 'snippet,replies',
    videoId,
  }, signal);

export const searchVideos = (query: string, signal?: AbortSignal) =>
  get<SearchResultItem>('search', {
    part: 'snippet',
    maxResults: 25,
    q: query,
  }, signal);
