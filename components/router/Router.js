import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import Aroute from './Aroute';
import Droute from './Droute';

export default function Router() {

  let login = useSelector((state) => state.variable.login)

  return (
    <NavigationContainer>
      {
        login ?
        <Droute /> :
        <Aroute />
      }
    </NavigationContainer>
  )
}