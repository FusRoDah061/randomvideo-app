import React, { useCallback, useState } from 'react';
import { SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, Colors } from '../../styles/globals';
import Search from '../../components/Search';
import youtubeApi from '../../services/youtube';
import {
  ChannelDescription,
  ChannelItem,
  ChannelItemInfo,
  ChannelList,
  ChannelListContainer,
  ChannelThumbnail,
  ChannelTitle,
  Container,
  HaveChannelsText,
  NoChannelsText,
} from './styles';
import { Channel } from '../../models/Channel';

interface SearchMetadata {
  search: string;
  nextPageToken: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchMetadata, setSearchMetadata] = useState<SearchMetadata | null>(
    null,
  );

  const searchChannels = useCallback(
    async (term: string, append = false, pageToken = '') => {
      const response = await youtubeApi.get('search', {
        params: {
          q: term,
          type: 'channel',
          part: 'snippet',
          maxResults: 50,
          pageToken,
        },
      });

      if (response) {
        const { data } = response;
        const metadata = data;

        if (append) {
          const newChannels = channels.concat(data.items);

          setChannels(newChannels);
        } else {
          setChannels(data.items);
        }

        delete metadata.items;

        setSearchMetadata({ ...metadata, search: term });
      }
    },
    [channels],
  );

  const handleNewPage = useCallback(async () => {
    setIsLoadingPage(true);

    try {
      if (searchMetadata) {
        await searchChannels(
          searchMetadata.search,
          true,
          searchMetadata.nextPageToken,
        );
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoadingPage(false);
  }, [searchMetadata, searchChannels]);

  const handleSearchChannel = useCallback(
    async (term: string) => {
      setIsLoading(true);

      try {
        await searchChannels(term, false);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    },
    [searchChannels],
  );

  const handlePressOnChannel = useCallback(
    (channel: Channel) => {
      navigation.navigate('Watch', { channel });
    },
    [navigation],
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.red}
        translucent
      />

      <SafeAreaView style={globalStyles.redContainer}>
        <Container>
          <Search onSearch={handleSearchChannel} />

          {channels.length === 0 && (
            <NoChannelsText>Search for a channel to begin</NoChannelsText>
          )}

          {isLoading && (
            <ActivityIndicator size="large" color={Colors.text.onRed} />
          )}

          {channels.length > 0 && (
            <>
              <HaveChannelsText>This is what I found...</HaveChannelsText>
              <ChannelListContainer>
                <ChannelList
                  data={channels}
                  keyExtractor={(channel: Channel, index: number) => {
                    return `${channel.snippet.channelId}@${index}`;
                  }}
                  onEndReachedThreshold={0.5}
                  onEndReached={handleNewPage}
                  ListFooterComponent={() => (
                    <>
                      {isLoadingPage && channels.length > 0 && (
                        <ActivityIndicator
                          size="large"
                          color={Colors.lightRedOnWhite}
                          style={{ paddingBottom: 30 }}
                        />
                      )}
                    </>
                  )}
                  renderItem={({ item }) => (
                    <ChannelItem
                      onPress={() => {
                        handlePressOnChannel(item);
                      }}
                    >
                      <ChannelThumbnail
                        source={{ uri: item.snippet.thumbnails.high.url }}
                      />

                      <ChannelItemInfo>
                        <ChannelTitle>{item.snippet.channelTitle}</ChannelTitle>
                        <ChannelDescription>
                          {item.snippet.description}
                        </ChannelDescription>
                      </ChannelItemInfo>
                    </ChannelItem>
                  )}
                />
              </ChannelListContainer>
            </>
          )}
        </Container>
      </SafeAreaView>
    </>
  );
};

export default Home;
