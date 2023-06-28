import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Image, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import wateringImg from '../assets/watering.png';
import colors from 'tailwindcss/colors';
import {Heading} from '../components/Heading';
import {Text} from '../components/Text';
export function Home() {
  const navigator = useNavigation();
  return (
    <SafeAreaView className="flex-1 items-center justify-around bg-white dark:bg-slate-900">
      <Heading className="text-center">
        Gerencie {'\n'} suas plantas {'\n'} de forma fácil
      </Heading>

      <Image source={wateringImg} className="w-full" resizeMode="contain" />

      <Text className="text-center  ">
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-14 w-14 items-center justify-center rounded-2xl bg-green-600"
        onPress={() => navigator.navigate('UserIdentification')}>
        <Feather name="chevron-right" size={32} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
