import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppProvider from './hooks';

import Routes from './routes';
import colors from './style/colors';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
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
};

export default App;
