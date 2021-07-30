import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import Topbar from 'ui/Topbar';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Movie"
      lazy={true}
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#cccccc',
        style: {backgroundColor: 'black'},
      }}>
      <Tab.Screen
        name="Movie"
        component={require('ui/HomeMovie').default}
        options={{
          tabBarIcon: ({color, size}: any) => (
            <Icon name="movie" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={require('ui/HomeTV').default}
        options={{
          tabBarIcon: ({color, size}: any) => (
            <Icon name="tv" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen name="Favorite" component={require('ui/Favorite').default} /> */}
    </Tab.Navigator>
  );
};
