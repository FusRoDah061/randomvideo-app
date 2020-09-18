import { StyleSheet, Platform, StatusBar } from 'react-native';

export function safeTopPadding(padding: number): number {
  const statusBarHeight = StatusBar.currentHeight || 0;
  return Platform.OS === 'android' ? statusBarHeight + padding : padding;
}

export const Colors = {
  red: '#D10000',
  white: '#FFFFFF',
  lightRedOnWhite: '#EFDEDE',
  text: {
    placeholder: '#CCBCBC',
    faintOnRed: '#FFC2C2',
    base: '#524343',
    onRed: '#FFFFFF',
    title: '#262020',
    redOnLightRed: '#940000',
  },
};

export const globalStyles = StyleSheet.create({
  redContainer: {
    flex: 1,
    backgroundColor: Colors.red,
    paddingTop: safeTopPadding(0),
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: safeTopPadding(0),
  },
});
