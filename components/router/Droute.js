import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input, Icon } from '@rneui/themed';

import Today from '../pages/Today';
import Report from '../pages/Report';
import Add from '../pages/Add';
import Products from '../pages/Products';
import Search from '../pages/Search';
import Individual from '../pages/Individual';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ViewPage(){
    return(
        <Tab.Navigator
        screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#f7f7f7',
        tabBarInactiveBackgroundColor: '#f7f7f7',
        }}>
    <Tab.Screen name="Today" component={Today}
    options={{
        tabBarIcon: ({focused}) => {
            return (
                <Icon 
                type='material'
                name='inbox'
                color={focused ? 'black':'#dad9d9'}
                />
            )
        }
    }}
    />
    <Tab.Screen name="Report" component={Report} 
    options={{
        tabBarIcon: ({focused}) => {
            return (
                <Icon 
                type='material'
                name='analytics'
                color={focused ? 'black':'#dad9d9'}
                />
            )
        }
    }}/>
    <Tab.Screen name="Add" component={Add}
    options={{
        tabBarIcon: ({focused}) => {
            return (
                <Icon 
                type='material'
                name='note-add'
                color={focused ? 'black':'#dad9d9'}
                />
            )
        }
    }}/>
    <Tab.Screen name="Products" component={Products}
    options={{
        tabBarIcon: ({focused}) => {
            return (
                <Icon 
                type='material'
                name='list-alt'
                color={focused ? 'black':'#dad9d9'}
                />
            )
        }
    }}/>
    </Tab.Navigator>
    )
}

function SearchPage(){
    return(
        <Stack.Navigator        
        screenOptions={{
        headerShown: false
          }}>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Individual" component={Individual}/>
        </Stack.Navigator>
    )
}

export default function Droute() {

let search = useSelector((state) => state.variable.search)

  return (
    <>
    {
        search ?
        <SearchPage />:
        <ViewPage />
    }
    </>
  )
}