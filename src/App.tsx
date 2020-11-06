import 'react-native-gesture-handler';
import React from 'react';
import codePush from 'react-native-code-push';
import AppStack from './routes/AppStack';

const App: React.FC = () => {
  return <AppStack />;
};

export default codePush(App);
