import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';
import {PlantSelector} from '../pages/PlantSelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyPlants} from '../pages/MyPlants';
import {useColorScheme} from 'react-native';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  const colorScheme = useColorScheme();

  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor:
          colorScheme === 'light' ? colors.gray[500] : colors.white,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'light' ? colors.white : colors.slate[800],
          height: 75,
        },
        headerShown: false,
      }}>
      <AppTab.Screen
        name="Nova Planta"
        component={PlantSelector}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <AppTab.Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => (
            <Icon name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;
