import jwtDecode from 'jwt-decode';
import {Platform, AsyncStorage} from 'react-native';
import {storeData, retrieveData} from '../helpers/asyncStorage';
import axios from '../../config/axios';
import {transformErrorsFromApi} from './transformError';

// import setAuthToken from '../Utils/setAuthToken';

// import {showSuccess, showError} from './actionsHelper';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LOGIN_ERR0RS,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_LOADING,
  USER_LOGOUT_SUCCESS,
  RESET_STORE,
} from './types';

var DeviceInfo = require('react-native-device-info');

// Set loggedin users
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
export const setUserLoginLoading = () => {
  return {
    type: USER_LOGIN_LOADING,
  };
};

export const logoutUser = () => dispatch => {
  // persistor.purge();

  const callApi = notification_token => {
    axios
      .post('/api/user/logout', {notification_token})
      .then(result => {
        // storeData('jwtToken', '');
        // AsyncStorage.removeItem('jwtToken');
        axios.defaults.headers.common.Authorization = '';
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
      });
  };

  AsyncStorage.getAllKeys()
    .then(keys => {
      keys.map(key => {
        if (key === 'notification_token') return;
        try {
          AsyncStorage.removeItem(key);
          return true;
        } catch (exception) {
          return false;
        }
      });
      // AsyncStorage.multiRemove(keys);
    })
    .then(() => {});
  dispatch({type: USER_LOGOUT_SUCCESS});
  dispatch({type: RESET_STORE});
  retrieveData('notification_token').then(notification_token => {
    callApi(notification_token);
  });
};

// Login User - Get user token
export const loginUser = (userData, setErrors, navigation) => dispatch => {
  dispatch({type: RESET_STORE});
  dispatch(setUserLoginLoading());

  retrieveData('notification_token').then(notification_token => {
    callAPi(notification_token);
  });

  const callAPi = notification_token => {
    userData.notification_token = notification_token;
    userData.device_id = DeviceInfo.getUniqueId();
    userData.device_type = Platform.OS;
    userData.device_name = DeviceInfo.getModel();
    return axios
      .post('/api/signin', userData)
      .then(result => {
        // SAVE to local storage
        // eslint-disable-next-line no-shadow
        const userData = (result.data && result.data.data) || {};
        const {token, space_id, userid, company_id} = userData;

        // console.log(userData, 'userdata is');
        // const space_id = userData.space_id || '5cd3f59f2ede1627cc2132dc';
        // const user_id = userData.userid;
        // const { company_id } = userData;

        axios.defaults.headers.common.Authorization = token;
        axios.defaults.headers.common.space_id = space_id;
        axios.defaults.headers.common.company_id = company_id;

        // Set token to local storage

        storeData('jwtToken', token).then(() => {
          // console.log(token, tokenSuccess);
          // console.log(token.slice(token.length - 10), 'login token');

          storeData('space_id', space_id).then(() => {
            // console.log(spaceSuccess, 'spaceSuccess');
            storeData('user_id', userid).then(() => {
              // console.log(userSuccess, 'useSuccess');

              storeData('company_id', company_id).then(() => {});

              // Set Token to Auth Header
              // setAuthToken(token);
              // Decode token to get user data
              const decoded = jwtDecode(token);
              let role = '';
              let policy = [];

              // console.log(decoded, 'decoded is');

              if (decoded && decoded.policy && decoded.policy.length > 0) {
                policy = decoded.policy[0].roletype_id.policy || [];
                role = decoded.policy[0].roletype_id.name;
              }

              // console.log(decoded.policy[0].roletype_id.policy, 'policy is');

              storeData('role', role).then(() => {});
              storeData('policy', policy).then(() => {});

              axios.defaults.headers.common.Authorization = token;

              dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: result.data,
              });

              // Set Current User
              dispatch(setCurrentUser(decoded));
              navigation.navigate('App');
            });
          });
        });
        // storeData('space_id', space_id);
        // storeData('user_id', user_id);
        // storeData('company_id', company_id);
      })
      .catch(err => {
        const error = err.response || {};
        if (error.status === 401) {
          dispatch({type: LOGIN_ERR0RS, payload: error.data});
          setErrors(transformErrorsFromApi(error));
        } else {
          dispatch({type: LOGIN_ERR0RS, payload: error.data});
          setErrors(transformErrorsFromApi(error));
        }
      });
  };
};
