/** ***************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ***************************** */

// import Constants from 'expo-constants';
import {Platform} from 'react-native';

// const localhost = Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';
const devApi = 'https://devapi.managespace.co';
// const devApi = 'https://api.managespace.co'; // live url

const ENV = {
  dev: {
    apiUrl: devApi,
    amplitudeApiKey: null,
  },
  staging: {
    apiUrl: devApi,
    amplitudeApiKey: '[Enter your key here]',
    // Add other keys you want here
  },
  prod: {
    // apiUrl: 'https://api.managespace.co',
    apiUrl: devApi,

    // Add other keys you want here
  },
};
const getEnvVars = env => {
  // return ENV.dev;
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else return ENV.prod;
};

export default getEnvVars;
