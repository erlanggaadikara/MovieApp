import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Topbar from 'ui/Topbar';
import Card from 'component/Card';
import FastImage from 'react-native-fast-image';

const SeeAll = () => {
  const route = useRoute();
  const nav = useNavigation();
  const {title, item}: any = route.params || {};
  return (
    <View style={{backgroundColor: 'black'}}>
      <Topbar>
        <TouchableOpacity>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
          {title}
        </Text>
        <View></View>
      </Topbar>
      <View style={{paddingBottom: 130}}>
        <FlatList
          data={item}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{margin: 10, width: 180}}
              onPress={() => nav.navigate('page/Detail', {item})}>
              <FastImage
                style={{width: 180, height: 200, borderRadius: 10}}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${
                    item.backdrop_path || item.poster_path
                  }`,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  marginVertical: 10,
                }}
                ellipsizeMode={'tail'}>
                {item['title'] || item['name']}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SeeAll;
