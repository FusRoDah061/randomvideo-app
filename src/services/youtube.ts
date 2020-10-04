import axios from 'axios';
import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';
import Config from 'react-native-config';

const androidHeaders = {
  'X-Android-Package': getBundleId() || Config.APP_PACKAGE || '',
  'X-Android-Cert': Config.APP_CERT_FINGERPRINT || '',
};

console.log(androidHeaders);

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: Config.YOUTUBE_API_KEY,
  },
  headers: Platform.OS === 'android' ? androidHeaders : {},
});

export default youtubeApi;
