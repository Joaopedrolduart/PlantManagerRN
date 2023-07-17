import React from 'react';
import {Routes} from './src/Routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
    </GestureHandlerRootView>
  );
}
