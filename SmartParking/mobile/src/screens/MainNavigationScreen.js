import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ReservationScreen from './ReservationScreen';
import ParksScreen from './ParksScreen';
import ProfileScreen from './ProfileScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function ({navigation}) {
  return (
    <Tab.Navigator tabBarOptions={{style: {backgroundColor: '#FFF'}}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={26} color={color} />,
        }}
      />
      <Tab.Screen
        name="Parks"
        component={ParksScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="parking" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservation"
        component={ReservationScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="ticket-confirmation" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="face-profile" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
