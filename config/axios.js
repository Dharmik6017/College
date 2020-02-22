import * as axios from 'axios';
import {AsyncStorage} from 'react-native';
import getEnvVars from '../env';

import {retrieveData} from '../src/helpers/asyncStorage';
const {apiUrl} = getEnvVars();

const instance = axios.create();
retrieveData('jwtToken').then(token => {
  retrieveData('space_id').then(spaceId => {
    instance.defaults.baseURL = apiUrl;
    instance.defaults.timeout = 20000;
    if (token) {
      instance.defaults.headers.common.Authorization = token;
      instance.defaults.headers.common.space_id = spaceId;
    }
    instance.defaults.headers.common.Accept = 'application/json';
  });
});
export {instance as default};
