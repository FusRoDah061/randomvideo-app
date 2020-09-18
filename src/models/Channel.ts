export interface Channel {
  snippet: {
    channelId: string;
    channelTitle: string;
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
    description?: string;
  };
}
