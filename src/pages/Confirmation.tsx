import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../components/Button';
import {StackRoutesList} from '../Routes/stack.routes';

export interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: keyof StackRoutesList;
}

const emojis = {
  hug: '🤗',
  smile: '😆',
};

export function Confirmation() {
  const navigator = useNavigation<NavigationProp<StackRoutesList>>();
  const routes = useRoute<RouteProp<StackRoutesList, 'Confirmation'>>();

  const {title, subtitle, buttonTitle, icon, nextScreen} = routes.params;

  return (
    <View className="flex-1 items-center justify-center space-y-10 px-4">
      <Text className="text-[75px] text-emoji"> {emojis[icon]} </Text>

      <View className="space-y-4">
        <Text className="text-center font-heading text-2xl text-gray-600 underline hover:underline-offset-4 dark:text-white">
          {title}
        </Text>

        <Text className="text-center font-body text-lg text-gray-500 dark:text-white">
          {subtitle}
        </Text>
      </View>

      <View className="w-3/4 px-4">
        <Button
          title={buttonTitle}
          onPress={() => navigator.navigate(nextScreen as any)}
        />
      </View>
    </View>
  );
}
