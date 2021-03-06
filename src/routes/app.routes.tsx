import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../style/colors';

import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const Routes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      // headerShown: false,
      cardStyle: { backgroundColor: `${colors.color_four}` },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default Routes;
