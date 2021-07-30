import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
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
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(true);

  const getlist = async () => {
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

  useEffect(() => {
    const fetchmovie = async () => {
      await getlist();
      setLoad(false);
    };

    fetchmovie();
  }, []);

  if (load)
    return (
      <View
        style={{
          width: dim.width,
          height: dim.height,
          backgroundColor: 'black',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View style={{paddingBottom: 56, backgroundColor: 'black'}}>
      <Topbar>
        <View></View>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
          Movie
        </Text>
        <View></View>
      </Topbar>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={async () => {
              setRefresh(true);
              await getlist();
            }}
          />
        }>
        <View
          style={{
            flexDirection: 'column',
            width: dim.width,
            flex: 1,
            flexGrow: 1,
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
