import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Topbar from 'ui/Topbar';
import favorite from 'storage/favorite';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Favorite = () => {
  const nav = useNavigation();
  const dim = Dimensions.get('window');
  const [fav, setFav] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const view = async () => {
        const getFav = await favorite.storage.load({key: 'favorite'});
        if (getFav) setFav(getFav);
      };

      view();
    }, []),
  );

  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'column',
        minHeight: dim.height,
      }}>
      <Topbar>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Icon name="arrow-back" size={20} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
          Favorite
        </Text>
        <View></View>
      </Topbar>
      <FlatList
        data={fav}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'black',
              marginHorizontal: 20,
              marginTop: 20,
            }}
            onPress={() => nav.navigate('page/Detail', {item})}>
            <FastImage
              style={{width: 80, height: 80, borderRadius: 10}}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item['poster_path']}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              {item['title'] || item['name']}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item['id']}
      />
    </View>
  );
};

export default Favorite;
