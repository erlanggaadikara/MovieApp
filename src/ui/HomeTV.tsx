import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import storage from 'storage/tv';
import SubTopic from 'ui/SubTopic';
import Topbar from './Topbar';

const HomeTV = () => {
  const dim = Dimensions.get('window');
  const [tv, setTV] = useState({
    toprated: [],
    popular: [],
    onair: [],
    airing: [],
  } as any);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(true);

  const getlist = async () => {
    Promise.all([
      storage.load({key: 'topratedtv', autoSync: true}),
      storage.load({key: 'populartv', autoSync: true}),
      storage.load({key: 'onairtv', autoSync: true}),
      storage.load({key: 'airingtv', autoSync: true}),
    ])
      .then(res => {
        setTV({
          toprated: [...res[0].results],
          popular: [...res[1].results],
          onair: [...res[2].results],
          airing: [...res[3].results],
        });
      })
      .finally(() => setRefresh(false));
  };

  useEffect(() => {
    const fetchtv = async () => {
      await getlist();
      setLoad(false);
    };
    fetchtv();
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
          TV
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
            flexGrow: 1,
            width: dim.width,
            flex: 1,
          }}>
          <SubTopic title={'Top rated'} item={tv.toprated} />
          <SubTopic title={'Popular'} item={tv.popular} />
          <SubTopic title={'On The Air'} item={tv.onair} />
          <SubTopic title={'Airing Today'} item={tv.airing} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTV;
