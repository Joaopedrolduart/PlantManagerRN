import React from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {SvgFromUri} from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import {Button} from '../components/Button';
import {useRoute} from '@react-navigation/native';
import {PlantType} from '../@types/PlantType';

export interface PlantSaveParams {
  plant: PlantType;
}

export function PlantSave() {
  const route = useRoute();
  const {plant} = route.params as PlantSaveParams;
  return (
    <View className="flex-1 justify-between bg-gray-shape">
      <View className="flex-1 items-center justify-center px-8">
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text className="font-heading text-2xl dark:text-white">
          {plant.name}
        </Text>
        <Text className="mt-4 text-center font-body text-base">
          {plant.about}
        </Text>
      </View>

      <View className="bg-white px-5 pb-5 pt-5">
        <View className="relative bottom-16 flex-row items-center justify-between rounded-3xl bg-blue-blue_light p-5">
          <Image source={waterdrop} className="h-14 w-14" />
          <Text className="ml-5 flex-1 text-justify font-body text-blue-blue">
            {plant.water_tips}
          </Text>
        </View>

        <Text className="mb-2 text-center font-heading text-xs text-gray-400">
          Escolha o melhor horário para ser lembrado:
        </Text>

        <Button title="Cadastrar planta" onPress={() => {}} />
      </View>
    </View>
  );
}
