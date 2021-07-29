import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import Topbar from 'ui/Topbar';
import MainTab from 'route/MainTab';

const Home: React.FC = () => {
  const dim = Dimensions.get('window');

  return (
    <View style={{paddingBottom: 70}}>
      <Topbar>
        <View></View>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
          Movie App
        </Text>
        <View></View>
      </Topbar>
    </View>
  );
};

export default Home;
