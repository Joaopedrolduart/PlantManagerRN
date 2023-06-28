import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';

export function PlantSelector() {
  return (
    <View className="flex-1 space-y-6">
      <View className="mt-6 space-y-6 px-4">
        <Header title="João" subtitle="Olá," />

        <View>
          <Text>Em qual ambiente</Text>
          <Text>você quer colocar sua planta?</Text>
        </View>
      </View>
    </View>
  );
}
