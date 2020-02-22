import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import { logger } from "redux-logger";
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer from './src/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'navigation',
    'isLoading',
    'hasErrored',
    'bookingData',
    'dashboard',
  ],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  // compose(applyMiddleware(...middleware))
  composeWithDevTools(applyMiddleware(...middleware)),
);
const persistor = persistStore(store);

export {store, persistor};
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     autoRehydrate(),
//     composeWithDevTools(applyMiddleware(...middleware))
//   )
// );

// export default store;
