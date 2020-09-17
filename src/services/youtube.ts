import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    /* TODO: Criar um backend para realziar a chamada ao youtube e esconder essa key */
    key: 'AIzaSyAWTKXcuAt4E3yiYpQvxKoi15z7mCGVnIw',
  },
});

export default youtubeApi;
