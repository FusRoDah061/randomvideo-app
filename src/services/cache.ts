import AsyncStorage from '@react-native-community/async-storage';
import { differenceInHours } from 'date-fns';

import { Channel } from '../models/Channel';
import { Video } from '../models/Video';

const CACHED_VIDEO_TTL_HOURS = 7 * 24;
const CACHED_CHANNELS_TTL_HOURS = 30 * 24;

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
  console.log('Updating channels cache');

  const baseKey = `RandomVideo/channels:[${searchKey.search.toLowerCase()}]@[${
    searchKey.pageToken
  }]`;

  await AsyncStorage.multiSet([
    [baseKey, JSON.stringify(results)],
    [`${baseKey}:updatedAt`, Date.now().toString()],
  ]);
};

const cleanSearchResultCache = async (
  searchKey: ChannelSearchKey,
): Promise<void> => {
  console.log('Cleaning channels cache...');

  const baseKey = `RandomVideo/channels:[${searchKey.search.toLowerCase()}]@[${
    searchKey.pageToken
  }]`;

  await Promise.all([
    AsyncStorage.removeItem(baseKey),
    AsyncStorage.setItem(`${baseKey}:updatedAt`, Date.now().toString()),
  ]);
};

export const getCachedSearchResult = async (
  searchKey: ChannelSearchKey,
): Promise<ChannelSearch | null> => {
  const baseKey = `RandomVideo/channels:[${searchKey.search.toLowerCase()}]@[${
    searchKey.pageToken
  }]`;

  const updatedAt = await AsyncStorage.getItem(`${baseKey}:updatedAt`);

  if (updatedAt) {
    const today = Date.now();

    if (
      differenceInHours(today, Number(updatedAt)) > CACHED_CHANNELS_TTL_HOURS
    ) {
      // Should clean all cached channels
      await cleanSearchResultCache(searchKey);
    }
  }

  const results = await AsyncStorage.getItem(baseKey);

  if (results) return JSON.parse(results);

  return null;
};
