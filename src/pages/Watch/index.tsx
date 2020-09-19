import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, RouteProp, useNavigation } from '@react-navigation/native';
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
import ContentPlaceholder from '../../components/VideoContentPlaceholder';
import { AppStackParamList } from '../../routes/AppStack';
import youtubeApi from '../../services/youtube';
import formatDate from '../../utils/formatDate';
import VideoContentPlaceholder from '../../components/VideoContentPlaceholder';

type WatchScreenRouteProp = RouteProp<AppStackParamList, 'Watch'>;

interface WatchProps {
  route: WatchScreenRouteProp;
}

interface Video {
  id: {
    videoId: string;
  };
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
  const [video, setVideo] = useState<Video | undefined>();
  const [channel] = useState<Channel>(route.params.channel);

  const handleVideoError = useCallback(error => {
    console.log(error);
  }, []);

  const handleWatchYoutube = useCallback(() => {
    Linking.openURL(`vnd.youtube://${video?.id.videoId}`);
  }, [video]);

  const getVideos = useCallback(async () => {
    try {
      const response = await youtubeApi.get('search', {
        params: {
          type: 'video',
          part: 'snippet',
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
    }

    return [];
  }, [channel]);

  const pickVideo = useCallback(async () => {
    console.log('Picking video');
    const videos = await getVideos();

    if (videos.length > 0) {
      const index = Math.round(Math.random() * (videos.length - 0) + 0);
      const pickedVideo = videos[index];

      console.log(pickedVideo.id.videoId);

      setVideo(pickedVideo);
    } else {
      console.log('No videos');
      setVideoIsReady(true);
    }
  }, [getVideos]);

  const handleRollAgain = useCallback(async () => {
    setVideoIsReady(false);
    await pickVideo();
    setVideoIsReady(true);
  }, [pickVideo]);

  useEffect(() => {
    pickVideo();
  }, [pickVideo]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent
      />

      <SafeAreaView style={globalStyles.whiteContainer}>
        <ScrollView style={{ flex: 1 }}>
          <Container>
            <Header>
              <BackButton onPress={() => navigation.goBack()}>
                <BackIcon source={backIcon} />
              </BackButton>

              <Title>{channel?.snippet.channelTitle}</Title>
            </Header>

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
                  videoId={video?.id.videoId}
                  play
                  onReady={e => setVideoIsReady(true)}
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
