import AsyncStorage from '@react-native-community/async-storage';

import { Channel } from '../models/Channel';
import { Video } from '../models/Video';

export interface ChannelSearchKey {
  search: string;
  pageToken: string;
}

export interface ChannelSearch {
  nextPageToken: string;
  channels: Channel[];
}

export const addSearchResultToCache = async (
  searchKey: ChannelSearchKey,
  results: ChannelSearch,
): Promise<void> => {
  await AsyncStorage.setItem(
    `RandomVideo/channels:[${searchKey.search.toLowerCase()}]@[${
      searchKey.pageToken
    }]`,
    JSON.stringify(results),
  );
};

export const getCachedSearchResult = async (
  searchKey: ChannelSearchKey,
): Promise<ChannelSearch | null> => {
  const results = await AsyncStorage.getItem(
    `RandomVideo/channels:[${searchKey.search.toLowerCase()}]@[${
      searchKey.pageToken
    }]`,
  );

  if (results) return JSON.parse(results);

  return null;
};

export const addVideosToCache = async (
  channelId: string,
  videos: Video[],
): Promise<void> => {
  await AsyncStorage.setItem(
    `RandomVideo/videos:[${channelId}]`,
    JSON.stringify(videos),
  );
};

export const getCachedVideos = async (channelId: string): Promise<Video[]> => {
  const videos = await AsyncStorage.getItem(
    `RandomVideo/videos:[${channelId}]`,
  );

  if (videos) {
    return JSON.parse(videos);
  }

  return [];
};
