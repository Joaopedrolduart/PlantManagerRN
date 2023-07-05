import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';

import UserImg from '../assets/pfp.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);
  return (
    <View className="w-full flex-row items-center justify-between">
      <View>
        <Text className="font-body text-3xl text-gray-600 dark:text-white">
          Olá,
        </Text>
        <Text className="font-heading text-3xl text-gray-600 dark:text-white">
          {userName}
        </Text>
      </View>

      <Image source={UserImg} className="h-14 w-14 rounded-full" />
    </View>
  );
}
