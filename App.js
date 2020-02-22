import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, AsyncStorage, ActivityIndicator} from 'react-native';
import Login from './src/views/login/login';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import FlashMessage from 'react-native-flash-message';
import WorkerList from './src/views/workerList/workerList';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './src/views/login/login';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
import Dashboard from './src/views/dashboard/dashboard';
import AddEmployee from './src/views/attendance/AddEmployee';

// import {DrawerActions} from 'react-navigation-drawer';
// import {ThemeProvider} from 'react-native-elements';

// fetch logger
// eslint-disable-next-line no-underscore-dangle
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  // eslint-disable-next-line no-underscore-dangle
  return global._fetch(uri, options, ...args).then(response => {
    return response;
  });
};

const MainRoot = () => {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const userToken = AsyncStorage.getItem('jwtToken').then(key => {
    console.log(key, 'key is');
    // return <Stack.Screen name="Home" component={WorkerList} />;
    setToken(true);
    // setToken(key);
    setLoading(false);
  });
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Stack.Navigator>
      {token && !loading ? (
        <>
          <Stack.Screen name="Home" component={Dashboard} />
          <Stack.Screen
            name="WorkerList"
            component={WorkerList}
            title="Attendance"
          />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );

  return (
    <View>
      {/* <Text>Hello</Text> */}
      <WorkerList />
      <Dashboard />
      <AddEmployee />
      {/* <Login /> */}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRoot />
          <FlashMessage position="bottom" />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
// export default App;
