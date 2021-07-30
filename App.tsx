/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import User from 'route/User';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    let ins = 0;
    const interval = setInterval(() => {
      if (ins >= 5) {
        SplashScreen.hide();
      }
      ins += 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NavigationContainer>
      <User />
    </NavigationContainer>
  );
};

export default App;
