import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StackRoutes, StackRoutesList} from './stack.routes';

export const Routes = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRoutesList {}
  }
}
