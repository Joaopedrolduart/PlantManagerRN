import React from 'react';
import {FlatList, View} from 'react-native';
import {Header} from '../components/Header';
import {Text} from '../components/Text';
import {EnvironmentButton} from '../components/EnviromentButton';

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
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({item}) => (
          <EnvironmentButton
            title="sala"
            state={(item && 'active') || undefined}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
