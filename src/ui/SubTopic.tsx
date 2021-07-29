import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import Card from 'component/Card';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const SubTopic = ({title, item}: any) => {
  const nav = useNavigation();
  const fiveitems = item.slice(0, 5);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => nav.navigate('page/SeeAll', {title, item})}>
          <Text style={{fontSize: 16, color: 'white'}}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={fiveitems}
        horizontal
        renderItem={({item}) => (
          <Card onPress={() => nav.navigate('page/Detail', {item})}>
            <FastImage
              style={{width: '100%', height: 200, borderRadius: 10}}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  item.backdrop_path || item.poster_path
                }`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text
              style={{color: 'white', textAlign: 'center', marginVertical: 10}}>
              {item['title'] || item['name']}
            </Text>
          </Card>
        )}
        keyExtractor={item => item['id']}
      />
    </>
  );
};

export default SubTopic;
