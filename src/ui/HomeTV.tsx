import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Text, RefreshControl} from 'react-native';
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
  const [load, setLoad] = useState(false);

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
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    const fetchtv = async () => {
      await getlist();
    };
    fetchtv();
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={load}
            onRefresh={async () => {
              setLoad(true);
              await getlist();
            }}
          />
        }>
        <View
          style={{
            flexDirection: 'column',
            width: dim.width,
            flex: 1,
            backgroundColor: 'black',
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
