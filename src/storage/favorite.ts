import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  storageBackend: AsyncStorage,
});

const Add = (item: any) => {
  let list: any[] = [];
  storage
    .load({key: 'favorite'})
    .then(res => {
      if (res) {
        list = [...res, item];
      }

      storage.save({key: 'favorite', data: [...list]});
    })
    .catch(err => {
      list.push(item);
      storage.save({key: 'favorite', data: [...list]});
    });
};

const Remove = (item: any) => {
  let list: any[] = [];
  storage.load({key: 'favorite'}).then(res => {
    if (res) {
      list = [...res].filter(x => x.id !== item.id);
    }

    storage.save({key: 'favorite', data: [...list]});
  });
};

export default {Add, Remove, storage};
