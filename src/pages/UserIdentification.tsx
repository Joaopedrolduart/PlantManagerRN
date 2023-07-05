import {NavigationProp, useNavigation} from '@react-navigation/native';
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
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '../components/Button';
import {StackRoutesList} from '../Routes/stack.routes';

export function UserIdentification() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [username, setUsername] = useState<string>();

  const navigator = useNavigation<NavigationProp<StackRoutesList>>();

  function handleChangeText(value: string) {
    setIsInvalid(!value);
    setUsername(value);
  }

  function handleSubmit() {
    if (!username) {
      setIsInvalid(true);
      return Alert.alert('Insira um nome para prosseguir ✔');
    }

    AsyncStorage.setItem('@plantmanager:user', username);

    navigator.navigate('Confirmation');
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full flex-1 items-center justify-center space-y-10 px-4">
            <View className="space-y-6">
              <Text className="text-center text-4xl text-emoji">
                {username ? '😆' : '😃'}
              </Text>

              <Text className="text-center font-heading text-2xl text-gray-600 dark:text-white">
                Como podemos {'\n'}
                chamar você?
              </Text>
            </View>

            <TextInput
              placeholder="Digite um nome"
              onChangeText={handleChangeText}
              className={`w-4/5 border-b border-gray-300 p-3 text-center font-body text-lg text-gray-500 focus:border-green-600 dark:text-white 
              ${isInvalid && 'border-red-500'}
              ${username && 'border-green-500'}`}
            />

            <View className="w-3/4 px-4">
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
