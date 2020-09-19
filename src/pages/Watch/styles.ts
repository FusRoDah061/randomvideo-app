import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import YouTube from 'react-native-youtube';
import { Colors } from '../../styles/globals';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 10px 16px;
  padding-top: 0;
`;

export const BackButton = styled(RectButton)`
  width: 58px;
  height: 58px;
  border-radius: 30px;
  background-color: ${Colors.lightRedOnWhite};
  align-items: center;
  justify-content: center;
`;

export const BackIcon = styled.Image`
  width: 26px;
  height: 26px;
`;

export const Title = styled.Text`
  flex: 1;
  color: ${Colors.text.title};
  font-weight: bold;
  margin-left: 10px;
  font-size: 20px;
`;

export const ChannelDetailsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
`;

export const ChannelLogo = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 50px;
`;

export const ChannelDescription = styled.Text`
  flex: 1;
  color: ${Colors.text.base};
  margin-left: 10px;
  font-size: 14px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  justify-content: space-between;
`;

export const RollAgainButton = styled(RectButton)`
  flex-direction: row;
  width: 48%;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${Colors.red};
`;

export const RollAgainButtonText = styled.Text`
  font-weight: bold;
  color: ${Colors.text.onRed};
  font-size: 16px;
`;

export const WatchYoutubeButton = styled(RectButton)`
  width: 48%;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${Colors.lightRedOnWhite};
`;

export const WatchYoutubeButtonText = styled.Text`
  font-weight: bold;
  color: ${Colors.text.redOnLightRed};
  font-size: 16px;
`;

export const VideoContainer = styled.View`
  margin-top: 16px;
`;

export const EmbeddedVideo = styled(YouTube)`
  align-self: stretch;
  height: 300px;
`;

export const VideoTitle = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.text.title};
`;

export const VideoDate = styled.Text`
  color: ${Colors.text.placeholder};
`;

export const VideDescriptionLabel = styled.Text`
  margin-top: 16px;
  font-weight: bold;
  color: ${Colors.text.title};
`;

export const VideoDescription = styled.Text`
  height: auto;
  margin-top: 5px;
  color: ${Colors.text.base};
  font-size: 14px;
`;
