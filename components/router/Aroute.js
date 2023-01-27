import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input, Icon } from '@rneui/themed';

import Login from '../authentication/Login';
import Signup from '../authentication/Signup';
import Forgot from '../authentication/Forgot';
import Otp from '../authentication/Otp';
import Reset from '../authentication/Reset';

const Stack = createNativeStackNavigator();

export default function Aroute() {
  return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
  )
}