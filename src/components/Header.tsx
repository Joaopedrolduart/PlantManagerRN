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
        <Text className="text-3xl font-light text-gray-600 dark:text-white">
          {subtitle}
        </Text>
        <Text className="text-3xl font-semibold text-gray-600 dark:text-white">
          {title}
        </Text>
      </View>

      <Image source={UserImg} className="" />
    </View>
  );
}
