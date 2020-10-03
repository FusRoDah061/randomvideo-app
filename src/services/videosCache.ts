import { Video } from '../models/Video';
import AsyncStorageCacheProvider from '../providers/CacheProvider/implementations/AsyncStorageCacheProvider';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';

const CACHED_VIDEO_TTL_MINUTES = 7 * 24 * 60;

const cacheProvider: ICacheProvider = new AsyncStorageCacheProvider();

export async function setVideos(
  channelId: string,
  videos: Video[],
): Promise<void> {
  console.log('Updating videos cache');

  await cacheProvider.set([
    {
      key: `RandomVideo:videos:${channelId}`,
      value: videos,
      options: {
        expirationInMinutes: CACHED_VIDEO_TTL_MINUTES,
      },
    },
  ]);
}

export async function getVideos(channelId: string): Promise<Video[]> {
  console.log('Get cached videos');

  const videos = await cacheProvider.get<Video[]>(
    `RandomVideo:videos:${channelId}`,
  );

  if (videos) {
    return videos;
  }

  return [];
}
