import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../pages/Home';
import Watch from '../pages/Watch';
import { Channel } from '../models/Channel';

interface WatchScreenProps {
  channel: Channel;
}

export type AppStackParamList = {
  Home: undefined;
  Watch: WatchScreenProps;
};

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Watch" component={Watch} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
