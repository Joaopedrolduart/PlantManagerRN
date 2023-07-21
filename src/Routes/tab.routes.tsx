import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'tailwindcss/colors';
import {PlantSelector} from '../pages/PlantSelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyPlants} from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.green[100],
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
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
