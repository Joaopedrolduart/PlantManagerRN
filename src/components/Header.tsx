import React from 'react';
import {View, Text, Image} from 'react-native';

import UserImg from '../assets/pfp.png';

type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({title, subtitle}: HeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between">
      <View>
        <Text className="font-body text-3xl text-gray-600 dark:text-white">
          {subtitle}
        </Text>
        <Text className="font-heading text-3xl text-gray-600 underline hover:underline-offset-4 dark:text-white">
          {title}
        </Text>
      </View>

      <Image source={UserImg} className="h-14 w-14 rounded-full" />
    </View>
  );
}
