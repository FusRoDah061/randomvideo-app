import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Linking,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Colors, globalStyles } from '../../styles/globals';

import {
  Container,
  Header,
  BackButton,
  BackIcon,
  Title,
  ChannelDetailsContainer,
  ChannelLogo,
  ChannelDescription,
  ButtonsContainer,
  RollAgainButton,
  RollAgainButtonText,
  WatchYoutubeButton,
  WatchYoutubeButtonText,
  VideoContainer,
  EmbeddedVideo,
  VideDescriptionLabel,
  VideoDate,
  VideoDescription,
  VideoTitle,
} from './styles';

import backIcon from '../../assets/icons/back.png';
import { Channel } from '../../models/Channel';
import { AppStackParamList } from '../../routes/AppStack';
import youtubeApi from '../../services/youtube';
import formatDate from '../../utils/formatDate';
import VideoContentPlaceholder from '../../components/VideoContentPlaceholder';

type WatchScreenRouteProp = RouteProp<AppStackParamList, 'Watch'>;

interface WatchProps {
  route: WatchScreenRouteProp;
}

interface Video {
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

const Watch: React.FC<WatchProps> = ({ route }) => {
  const navigation = useNavigation();
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<Video | undefined>();
  const [channel] = useState<Channel>(route.params.channel);

  const handleVideoError = useCallback(error => {
    console.log(error);
    ToastAndroid.show(
      'An error ocurred while loading the video. Try again.',
      ToastAndroid.LONG,
    );
  }, []);

  const handleWatchYoutube = useCallback(() => {
    Linking.openURL(`vnd.youtube://${video?.id.videoId}`);
  }, [video]);

  const getVideos = useCallback(async () => {
    try {
      const response = await youtubeApi.get('search', {
        params: {
          type: 'video',
          maxResults: 50,
          channelId: channel.snippet.channelId,
          videoEmbeddable: true,
          order: 'date',
        },
      });

      if (response) {
        const { data } = response;
        return data.items;
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Could not fetch videos to choose from.',
        ToastAndroid.SHORT,
      );

      navigation.goBack();
    }

    return [];
  }, [channel, navigation]);

  const loadVideo = useCallback(
    async (id: string) => {
      const response = await youtubeApi.get('videos', {
        params: {
          id,
          type: 'video',
          maxResults: 1,
          part: 'snippet',
        },
      });

      if (response) {
        const { data } = response;
        setVideo(data.items[0]);
      }
    },
    [setVideo],
  );

  const pickVideo = useCallback(async () => {
    const videos = await getVideos();

    if (videos.length > 0) {
      const index = Math.round(Math.random() * (videos.length - 0) + 0);
      const pickedVideo = videos[index];
      loadVideo(pickedVideo.id.videoId);
    } else {
      ToastAndroid.show(
        'There are no videos to choose from on this channel.',
        ToastAndroid.SHORT,
      );

      navigation.goBack();
      setVideoIsReady(true);
    }
  }, [getVideos, loadVideo, navigation]);

  const handleRollAgain = useCallback(async () => {
    setVideoIsReady(false);
    setIsLoading(true);
    await pickVideo();
    setIsLoading(false);
    setVideoIsReady(true);
  }, [pickVideo]);

  useEffect(() => {
    async function loadInitialVideo() {
      await pickVideo();
      setIsLoading(false);
    }

    loadInitialVideo();
  }, [pickVideo]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent
      />

      <SafeAreaView style={globalStyles.whiteContainer}>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon source={backIcon} />
          </BackButton>

          <Title>{channel?.snippet.channelTitle}</Title>
        </Header>

        <ScrollView style={{ flex: 1 }}>
          <Container>
            <ChannelDetailsContainer>
              <ChannelLogo
                source={{
                  uri: channel?.snippet.thumbnails.high.url,
                }}
              />

              <ChannelDescription>
                {channel?.snippet.description}
              </ChannelDescription>
            </ChannelDetailsContainer>

            <ButtonsContainer>
              <RollAgainButton enabled={videoIsReady} onPress={handleRollAgain}>
                {isLoading && (
                  <ActivityIndicator
                    color={Colors.white}
                    style={{ marginRight: 6 }}
                  />
                )}
                <RollAgainButtonText>Roll again</RollAgainButtonText>
              </RollAgainButton>

              <WatchYoutubeButton onPress={handleWatchYoutube}>
                <WatchYoutubeButtonText>
                  Watch on YouTube
                </WatchYoutubeButtonText>
              </WatchYoutubeButton>
            </ButtonsContainer>

            {video ? (
              <VideoContainer>
                <EmbeddedVideo
                  apiKey="AIzaSyAWTKXcuAt4E3yiYpQvxKoi15z7mCGVnIw"
                  videoId={video?.id}
                  play
                  onReady={() => setVideoIsReady(true)}
                  onError={e => handleVideoError(e.error)}
                />

                <VideoTitle>{video?.snippet.title}</VideoTitle>
                <VideoDate>
                  {video && formatDate(new Date(video.snippet.publishedAt))}
                </VideoDate>

                <VideDescriptionLabel>Description</VideDescriptionLabel>
                <VideoDescription>
                  {video?.snippet.description}
                </VideoDescription>
              </VideoContainer>
            ) : (
              <VideoContentPlaceholder style={{ marginTop: 16 }} />
            )}
          </Container>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Watch;
