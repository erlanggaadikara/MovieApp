import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const API_KEY = '8fc827a73c30af64f3c7e4028c5cc828';
const ENDPOINT = 'https://api.themoviedb.org/3/movie/';

const toprated = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}top_rated?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'toprated',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    throw new Error('error');
  }
};

const upcoming = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}upcoming?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'upcoming',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    throw new Error('error');
  }
};

const popular = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}popular?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'popular',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    throw new Error('error');
  }
};

const nowplaying = async () => {
  const fetch = await Axios.get(
    `${ENDPOINT}now_playing?api_key=${API_KEY}&language=en-US`,
  );

  if (fetch.data) {
    storage.save({
      key: 'nowplaying',
      data: fetch.data,
    });

    return fetch.data;
  } else {
    throw new Error('error');
  }
};

const storage = new Storage({
  storageBackend: AsyncStorage,
  enableCache: true,
  sync: {toprated, popular, nowplaying, upcoming},
});

export default storage;
