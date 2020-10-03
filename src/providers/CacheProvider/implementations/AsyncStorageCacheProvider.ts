/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-community/async-storage';
import { differenceInMinutes } from 'date-fns';
import ICacheProvider, {
  IAddToCacheDTO,
  IAddToCacheOptions,
} from '../models/ICacheProvider';

export default class AsyncStorageCacheProvider implements ICacheProvider {
  public async set(data: IAddToCacheDTO[]): Promise<void> {
    await Promise.all([
      // Set all keys
      AsyncStorage.multiSet(
        data.map(keyValuePair => {
          return [keyValuePair.key, JSON.stringify(keyValuePair.value)];
        }),
      ),
      // Set keys options
      AsyncStorage.multiSet(
        data.map(keyValuePair => {
          const { options } = keyValuePair;

          if (options) {
            options.updatedAt = Date.now();

            return [`${keyValuePair.key}:options`, JSON.stringify(options)];
          }

          return [`${keyValuePair.key}:options`, '{}'];
        }),
      ),
    ]);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    const options = await AsyncStorage.getItem(`${key}:options`);

    if (options) {
      const optionsJson = JSON.parse(options) as IAddToCacheOptions;

      if (optionsJson.expirationInMinutes && optionsJson.updatedAt) {
        const today = Date.now();

        if (
          differenceInMinutes(today, optionsJson.updatedAt) >
          optionsJson.expirationInMinutes
        ) {
          // Should clean all cached videos
          await this.remove([key]);
        }
      }
    }

    const value = await AsyncStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as T;
    }

    return undefined;
  }

  public async remove(keys: string[]): Promise<void> {
    await AsyncStorage.multiRemove(keys);
  }
}
