import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import storage from 'storage/movie';
import SubTopic from 'ui/SubTopic';
import Topbar from './Topbar';

const HomeMovie = () => {
  const dim = Dimensions.get('window');
  const [movie, setMovie] = useState({
    toprated: [],
    popular: [],
    upcoming: [],
    nowplaying: [],
  } as any);

  useEffect(() => {
    const fetchmovie = async () => {
      Promise.all([
        storage.load({key: 'toprated', autoSync: true}),
        storage.load({key: 'popular', autoSync: true}),
        storage.load({key: 'upcoming', autoSync: true}),
        storage.load({key: 'nowplaying', autoSync: true}),
      ]).then(res => {
        setMovie({
          toprated: [...res[0].results],
          popular: [...res[1].results],
          upcoming: [...res[2].results],
          nowplaying: [...res[3].results],
        });
      });
    };

    fetchmovie();
  }, []);
  return (
    <View style={{paddingBottom: 56}}>
      <Topbar>
        <View></View>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
          Movie App
        </Text>
        <View></View>
      </Topbar>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            width: dim.width,
            flex: 1,
            backgroundColor: 'black',
          }}>
          <SubTopic title={'Top rated'} item={movie.toprated} />
          <SubTopic title={'Popular'} item={movie.popular} />
          <SubTopic title={'Upcoming'} item={movie.upcoming} />
          <SubTopic title={'Now Playing'} item={movie.nowplaying} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeMovie;
