import axios from 'axios';
import Config from 'react-native-config';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: Config.YOUTUBE_API_KEY,
  },
});

export default youtubeApi;
