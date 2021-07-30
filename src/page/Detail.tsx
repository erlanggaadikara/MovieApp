import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Topbar from 'ui/Topbar';
import Card from 'component/Card';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import favorite from 'storage/favorite';
import Toast from 'react-native-simple-toast';

const Detail = () => {
  const dim = Dimensions.get('window');
  const route = useRoute();
  const {title, item}: any = route.params || {};
  const [isFav, setFav] = useState(false);

  useEffect(() => {
    const view = async () => {
      const getFav = await favorite.storage.load({key: 'favorite'});
      if (getFav) {
        for (let x in getFav) {
          if (item.id === getFav[x].id) {
            setFav(true);
            break;
          }
        }
      }
    };

    view();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: dim.width,
          backgroundColor: 'black',
          paddingBottom: 20,
        }}>
        <FastImage
          style={{width: dim.width, height: 250}}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              item.backdrop_path || item.poster_path
            }`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: dim.width,
            marginHorizontal: 10,
            marginVertical: 16,
          }}>
          <Card>
            <FastImage
              style={{width: '100%', height: 190, borderRadius: 10}}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  item.poster_path || item.backdrop_path
                }`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Card>
          <View style={{flexDirection: 'column', width: '50%'}}>
            <Text style={{fontSize: 20, color: 'white'}}>
              {item.name || item.title}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '200', color: 'white'}}>
              {item['original_name'] || item['original_title']}
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 7}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" size={14} color={'white'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '200',
                    color: 'white',
                    marginHorizontal: 5,
                  }}>
                  {item.vote_average}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Icon name="thumb-up" size={14} color={'white'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '200',
                    color: 'white',
                    marginHorizontal: 5,
                  }}>
                  {item.vote_count}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (isFav) {
                  favorite.Remove(item);
                  setFav(false);
                  Toast.show('remove from favorite');
                } else {
                  favorite.Add(item);
                  setFav(true);
                  Toast.show('Add to favorite');
                }
              }}>
              <EvilIcon
                name="heart"
                color={isFav ? 'red' : 'white'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={{color: 'white', fontSize: 20, marginVertical: 8}}>
            Summary
          </Text>
          <Text style={{color: 'white'}}>{item.overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;
