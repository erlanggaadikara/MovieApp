import React from 'react';
import {StyleSheet, Text, useColorScheme, View, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SplashScreen: React.FC = () => {
  const dim = Dimensions.get('window');
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: dim.height,
        width: dim.width,
        flex: 1,
        backgroundColor: 'black',
      }}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
        Movie App
      </Text>
    </View>
  );
};

export default SplashScreen;
