import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Button} from '../components/Button';

export function UserIdentification() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [username, setUsername] = useState<string>();

  function handleChangeText(value: string) {
    setIsInvalid(!value);
    setUsername(value);
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full flex-1 items-center justify-center space-y-10 px-4">
            <View className="space-y-6">
              <Text className="text-emoji text-center text-4xl">
                {username ? '😆' : '😃'}
              </Text>

              <Text className="text-center text-2xl font-semibold text-gray-600 dark:text-white">
                Como podemos {'\n'}
                chamar você?
              </Text>
            </View>

            <TextInput
              placeholder="Digite um nome"
              onChangeText={handleChangeText}
              className={`w-4/5 border-b border-gray-300 p-3 text-center text-lg text-gray-600 focus:border-green-500 dark:text-white 
              ${isInvalid && 'border-red-500'}
              ${username && 'border-green-500'}`}
            />

            <View className="w-3/4 px-4">
              <Button />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
