import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../style/colors';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard'; // TEMPORARY
import Profile from '../pages/Profile'; // TEMPORARY
import CreateAppointment from '../pages/CreateAppointment'; // TEMPORARY
import AppointmentCreated from '../pages/AppointmentCreated'; // TEMPORARY

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: `${colors.color_four}` },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Dashboard" component={Dashboard} />
    <Auth.Screen name="Profile" component={Profile} />
    <Auth.Screen name="CreateAppointment" component={CreateAppointment} />
    <Auth.Screen name="AppointmentCreated" component={AppointmentCreated} />
  </Auth.Navigator>
);

export default AuthRoutes;
