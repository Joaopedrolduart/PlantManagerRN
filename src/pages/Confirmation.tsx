import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

import {Button} from '../components/Button';

export function Confirmation() {
  const navigator = useNavigation();
  return (
    <View className="flex-1 items-center justify-center space-y-10 px-4">
      <Text className="text-emoji text-[75px]">😊</Text>

      <View className="space-y-4">
        <Text className="text-center font-subtitle text-2xl text-gray-600 dark:text-white">
          Prontinho
        </Text>

        <Text className="text-center font-body text-lg text-gray-600 dark:text-white">
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
      </View>

      <View className="w-3/4 px-4">
        <Button
          title="Começar"
          onPress={() => navigator.navigate('PlantSelector')}
        />
      </View>
    </View>
  );
}
