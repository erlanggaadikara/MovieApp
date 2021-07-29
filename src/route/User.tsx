import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainTab from 'route/MainTab';

const routes: any = {
  'page/Home': require('page/Home').default,
  'page/SeeAll': require('page/SeeAll').default,
  'page/Detail': require('page/Detail').default,
};

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name={'Home'} component={MainTab} />
      {Object.keys(routes).map((name: string) => (
        <Stack.Screen key={name} name={name} component={routes[name]} />
      ))}
    </Stack.Navigator>
  );
};
