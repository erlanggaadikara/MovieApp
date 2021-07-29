import React from 'react';
import {View, TouchableOpacity} from 'react-native';

interface IProps {
  children?: any;
  onPress?: () => void;
}

const Card = (props: IProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          width: 140,
        }}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
