export interface Video {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description?: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}
