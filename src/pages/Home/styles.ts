import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Channel } from '../../models/Channel';
import { Colors } from '../../styles/globals';

export const Container = styled.View`
  flex: 1;
`;

export const NoChannelsText = styled.Text`
  font-size: 24px;
  text-align: center;
  max-width: 220px;
  color: ${Colors.text.faintOnRed};
  margin-top: 25px;
  margin-bottom: 25px;
  align-self: center;
`;

export const HaveChannelsText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  align-self: stretch;
  margin-horizontal: 20px;
  margin-vertical: 15px;
  color: ${Colors.text.onRed};
`;

export const ChannelListContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const ChannelList = styled(FlatList as new () => FlatList<Channel>)`
  padding-top: 15px;
`;

export const ChannelItem = styled(RectButton)`
  flex-direction: row;
  padding: 15px 20px 15px 20px;
`;

export const ChannelThumbnail = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 40px;
  margin-top: 5px;
`;

export const ChannelItemInfo = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const ChannelTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
`;

export const ChannelDescription = styled.Text`
  font-size: 12px;
  color: ${Colors.text.base};
`;
