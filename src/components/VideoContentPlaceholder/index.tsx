import React from 'react';
import ContentLoader, {
  Rect,
  IContentLoaderProps,
} from 'react-content-loader/native';
import { darken } from 'polished';
import { Dimensions, useWindowDimensions } from 'react-native';
import { Colors } from '../../styles/globals';

type VideoContentPlaceholder = IContentLoaderProps;

const VideoContentPlaceholder: React.FC<VideoContentPlaceholder> = props => {
  const dimensions = useWindowDimensions();

  return (
    <ContentLoader
      speed={1}
      width={dimensions.width - 32}
      height={500}
      viewBox={`0 0 ${dimensions.width - 32} 500`}
      backgroundColor={Colors.placeholderContent}
      foregroundColor={darken(0.1, Colors.placeholderContent)}
      {...props}
    >
      <Rect
        x="0"
        y="0"
        rx="10"
        ry="10"
        width={dimensions.width - 32}
        height="300"
      />
      <Rect x="0" y="316" rx="5" ry="5" width="250" height="23" />
      <Rect x="0" y="344" rx="5" ry="5" width="170" height="17" />
      <Rect x="0" y="377" rx="5" ry="5" width="120" height="23" />
      <Rect
        x="0"
        y="405"
        rx="5"
        ry="5"
        width={dimensions.width - 32}
        height="75"
      />
    </ContentLoader>
  );
};

export default VideoContentPlaceholder;
