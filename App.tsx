/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className="bg-neutral-300 dark:bg-slate-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text className="text-2xl font-bold dark:text-white"> Hello </Text>
    </SafeAreaView>
  );
}

export default App;
