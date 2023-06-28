import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../components/Header';

export function PlantSelector() {
  return (
    <View className="flex-1 space-y-6">
      <View className="mt-6 space-y-6 px-4">
        <Header title="João" subtitle="Olá," />

        <View>
          <Text className="text-base font-medium text-gray-600 dark:text-white">
            Em qual ambiente
          </Text>
          <Text className="text-base text-gray-600 dark:text-white">
            você quer colocar sua planta?
          </Text>
        </View>
      </View>
    </View>
  );
}
