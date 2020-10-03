import { Channel } from '../models/Channel';
import AsyncStorageCacheProvider from '../providers/CacheProvider/implementations/AsyncStorageCacheProvider';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';

const CACHED_CHANNELS_TTL_MINUTES = 30 * 24 * 60;

export interface ChannelSearchKey {
  search: string;
  pageToken: string;
}

export interface ChannelSearch {
  nextPageToken: string;
  channels: Channel[];
}

const cacheProvider: ICacheProvider = new AsyncStorageCacheProvider();

export async function setChannels(
  searchKey: ChannelSearchKey,
  results: ChannelSearch,
): Promise<void> {
  console.log('Updating channels cache');
  await cacheProvider.set([
    {
      key: `RandomVideo:channels:${searchKey.search.toLowerCase()}:${
        searchKey.pageToken
      }`,
      value: results,
      options: {
        expirationInMinutes: CACHED_CHANNELS_TTL_MINUTES,
      },
    },
  ]);
}

export async function getChannels(
  searchKey: ChannelSearchKey,
): Promise<ChannelSearch | null> {
  console.log('Getting cached channels');

  const channelSearch = await cacheProvider.get<ChannelSearch>(
    `RandomVideo:channels:${searchKey.search.toLowerCase()}:${
      searchKey.pageToken
    }`,
  );

  if (channelSearch) {
    return channelSearch;
  }

  return null;
}
