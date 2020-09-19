import AsyncStorage from '@react-native-community/async-storage';

import { Channel } from '../models/Channel';

export interface ChannelSearchKey {
  search: string;
  pageToken: string;
}

export interface ChannelSearch {
  nextPageToken: string;
  channels: Channel[];
}

const addSearchResultToCache = async (
  searchKey: ChannelSearchKey,
  results: ChannelSearch,
): Promise<void> => {
  await AsyncStorage.setItem(
    `[${searchKey.search.toLowerCase()}]@[${searchKey.pageToken}]`,
    JSON.stringify(results),
  );
};

const getCachedSearchResult = async (
  searchKey: ChannelSearchKey,
): Promise<ChannelSearch | null> => {
  const results = await AsyncStorage.getItem(
    `[${searchKey.search.toLowerCase()}]@[${searchKey.pageToken}]`,
  );

  if (results) return JSON.parse(results);

  return null;
};

export { addSearchResultToCache, getCachedSearchResult };
