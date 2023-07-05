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

export function PlantSave() {
  return (
    <View className="flex-1 justify-between bg-slate-100">
      <View className="flex-1 items-center justify-center px-8">
        <SvgFromUri uri="" height={150} width={150} />
        <Text className="font-heading text-2xl dark:text-white">
          Nome da Planta
        </Text>
        <Text className="mt-4 text-center font-body text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
          voluptate ratione debitis odit reprehenderit sint natus fugiat
          voluptatibus illo nesciunt suscipit magnam nobis impedit atque quia
          maiores soluta quibusdam nemo!
        </Text>
      </View>

      <View className="bg-white px-5 pb-5 pt-5">
        <View className="flex-row items-center justify-between rounded-3xl bg-cyan-50 p-5">
          <Image source={waterdrop} className="h-14 w-14" />
          <Text className="ml-5 flex-1 text-justify font-body text-cyan-700 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
