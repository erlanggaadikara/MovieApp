import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: 'black',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}>
      <Drawer.Screen
        name="Home"
        component={require('route/BottomTab').default}
      />
      <Drawer.Screen
        name="Favorite"
        component={require('page/Favorite').default}
      />
    </Drawer.Navigator>
  );
};
