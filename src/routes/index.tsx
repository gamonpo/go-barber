import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../style/colors';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: `${colors.color_four}` },
    }}
  >
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default Routes;
