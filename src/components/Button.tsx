import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export function Button() {
  return (
    <TouchableOpacity className="h-14 items-center justify-center rounded-2xl bg-green-600 dark:bg-green-600/75">
      <Text className="text-base font-medium text-white "> Confirmar </Text>
    </TouchableOpacity>
  );
}
