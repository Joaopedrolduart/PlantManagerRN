import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';

//import Feather from 'react-native-vector-icons/Feather';
import wateringImg from '../assets/watering.png';

export function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className="flex-1 items-center justify-around bg-white dark:bg-slate-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text className="text-center text-3xl font-bold text-gray-500 dark:text-white">
        {' '}
        Gerencie {'\n'} suas plantas {'\n'} de forma fácil{' '}
      </Text>

      <Image source={wateringImg} className="w-full" resizeMode="contain" />

      <Text className="text-center text-2xl font-bold text-gray-500 dark:text-white ">
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre
        que precisar.
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
        {/*<Text className="text-base font-medium text-white"> > </Text>
        <Feather name="chevron-right" size={30} color="#fff" />*/}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
