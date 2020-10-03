export interface IAddToCacheOptions {
  expirationInMinutes?: number;
  updatedAt?: number;
}

export interface IAddToCacheDTO {
  key: string;
  value: any;
  options?: IAddToCacheOptions;
}

export default interface ICacheProvider {
  set(data: IAddToCacheDTO[]): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
  remove(keys: string[]): Promise<void>;
}
