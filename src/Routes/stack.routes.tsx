import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from 'tailwindcss/colors';

import {Home} from '../pages/Home';
import {UserIdentification} from '../pages/UserIdentification';
import {Confirmation} from '../pages/Confirmation';

export type StackRoutesList = {
  Welcome: undefined;
  UserIdentification: undefined;
  Confirmation: undefined;
  PlantSelector: undefined;
};

const stackRoutes = createNativeStackNavigator<StackRoutesList>();

export function StackRoutes() {
  const colorScheme = useColorScheme();

  return (
    <stackRoutes.Navigator
      key={colorScheme}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor:
            colorScheme === 'light' ? colors.white : colors.gray[800],
        },
      }}>
      <stackRoutes.Screen name="Welcome" component={Home} />

      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />

      <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    </stackRoutes.Navigator>
  );
}
