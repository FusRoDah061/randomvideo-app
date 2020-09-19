import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, Colors } from '../../styles/globals';
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
  SearchButton,
  SearchContainer,
  SearchIcon,
  SearchInput,
} from './styles';
import { Channel } from '../../models/Channel';

import searchIcon from '../../assets/icons/search.png';

interface SearchMetadata {
  search: string;
  nextPageToken: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [search, setSearch] = useState('');
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
        if (searchMetadata.nextPageToken) {
          await searchChannels(
            searchMetadata.search,
            true,
            searchMetadata.nextPageToken,
          );
        }
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Could not fetch more results. Check internet connection and try again.',
        ToastAndroid.LONG,
      );
    }

    setIsLoadingPage(false);
  }, [searchMetadata, searchChannels]);

  const handleSearchChannel = useCallback(async () => {
    setIsLoading(true);

    try {
      await searchChannels(search, false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Could not search channel. Check internet connection and try again.',
        ToastAndroid.LONG,
      );
    }

    setIsLoading(false);
  }, [search, searchChannels]);

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
          <SearchContainer>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search channel"
              placeholderTextColor={Colors.text.placeholder}
              returnKeyType="search"
              onSubmitEditing={handleSearchChannel}
            />

            <SearchButton onPress={handleSearchChannel}>
              <SearchIcon source={searchIcon} />
            </SearchButton>
          </SearchContainer>

          {channels.length === 0 && (
            <NoChannelsText>
              Search for any YouTube channel to begin
            </NoChannelsText>
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
