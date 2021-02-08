import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import AppProvider from './hooks';

import Routes from './routes';
import colors from './style/colors';

const App: React.FC = () => (
  <NavigationContainer>
    {/* <AppProvider> */}
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.color_five}
      translucent
    />
    <Routes />
    {/* </AppProvider> */}
  </NavigationContainer>
);

export default App;
