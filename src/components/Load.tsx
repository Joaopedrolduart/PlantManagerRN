import React from 'react';
import {View} from 'react-native';

import AnimatedLottieView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';

export function Load() {
  return (
    <View className="h-full w-full flex-1 items-center justify-center bg-transparent">
      <AnimatedLottieView source={loadAnimation} autoPlay loop />
    </View>
  );
}
