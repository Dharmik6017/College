import {AsyncStorage} from 'react-native';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const retrieveData = async key => {
  let value = '';
  try {
    value = (await AsyncStorage.getItem(key)) || '';
    if (value) {
      return value;
    }
  } catch (error) {
    return null;
    // Error retrieving data
  }
  return null;
};

export {storeData, retrieveData};
