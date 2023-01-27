import { React } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

export default function Sroute(){
    return(
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}