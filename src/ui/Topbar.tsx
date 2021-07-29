import React from 'react';
import {View} from 'react-native';

const Topbar = ({children}: any) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}>
      {children}
    </View>
  );
};

export default Topbar;
