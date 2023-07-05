import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from 'tailwindcss/colors';

import {Home} from '../pages/Home';
import {UserIdentification} from '../pages/UserIdentification';
import {Confirmation} from '../pages/Confirmation';
import {PlantSelector} from '../pages/PlantSelector';
import {PlantSave, PlantSaveParams} from '../pages/PlantSave';

export type StackRoutesList = {
  Home: undefined;
  UserIdentification: undefined;
  Confirmation: undefined;
  PlantSelector: undefined;
  PlantSave: PlantSaveParams;
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
      <stackRoutes.Screen name="Home" component={Home} />

      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />

      <stackRoutes.Screen name="Confirmation" component={Confirmation} />

      <stackRoutes.Screen name="PlantSelector" component={PlantSelector} />

      <stackRoutes.Screen name="PlantSave" component={PlantSave} />
    </stackRoutes.Navigator>
  );
}
