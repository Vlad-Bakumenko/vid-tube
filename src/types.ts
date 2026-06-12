export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface VideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  categoryId: string;
  thumbnails: Thumbnails;
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export interface VideoItem {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

export interface ChannelSnippet {
  title: string;
  thumbnails: Thumbnails;
}

export interface ChannelStatistics {
  subscriberCount: string;
}

export interface ChannelItem {
  id: string;
  snippet: ChannelSnippet;
  statistics: ChannelStatistics;
}

export interface CommentSnippetDetail {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  likeCount: number;
  publishedAt: string;
}

export interface CommentThread {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: CommentSnippetDetail;
    };
  };
}

export interface SearchResultItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: Thumbnails;
  };
}
