import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import SplashScreen from './SplashScreen';


export type AuthRoutes = {
  SplashScreen: undefined;
};

export const AuthStack = createSharedElementStackNavigator<AuthRoutes>();

export const SplashNavigator = () => (
  <AuthStack.Navigator initialRouteName="SplashScreen">
    <AuthStack.Screen
      name="SplashScreen"
      options={{headerShown: false}}
      component={SplashScreen}
    />
  </AuthStack.Navigator>
);
