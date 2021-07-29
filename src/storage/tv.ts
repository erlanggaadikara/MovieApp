import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const API_KEY = '8fc827a73c30af64f3c7e4028c5cc828';
const ENDPOINT = 'https://api.themoviedb.org/3/tv/';

const topratedtv = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}top_rated?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'topratedtv',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    console.log(fetch);
    throw new Error('error');
  }
};

const onairtv = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}on_the_air?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'onairtv',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    console.log(fetch);
    throw new Error('error');
  }
};

const populartv = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}popular?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'populartv',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    console.log(fetch);
    throw new Error('error');
  }
};

const airingtv = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}airing_today?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'airingtv',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    console.log(fetch);
    throw new Error('error');
  }
};

const storage = new Storage({
  storageBackend: AsyncStorage,
  enableCache: true,
  sync: {topratedtv, populartv, onairtv, airingtv},
});

export default storage;
