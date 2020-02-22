import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Icon, SearchBar, Text, Input} from 'react-native-elements';

import {DrawerActions} from 'react-navigation-drawer';
import {connect} from 'react-redux';
import fonts from './fonts';
import {getCoworkers} from '../src/actions/coworkerAction';
import {getCompanies} from '../src/actions/companiesAction';
import {setLoginPopup} from '../src/actions/authAction';
import {getTickets} from '../src/actions/helpdeskActions';
import {getAllClubs} from '../src/actions/allClubActions';
import {getPartners} from '../src/actions/partnerAction';
import {getEvents} from '../src/actions/eventAction';

import AppColors from '../src/theme/AppColors';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // flex: 1,
    height: 60,
    padding: 5,
    backgroundColor: AppColors.drawerColor,
    borderBottomColor: '#efefef',
    // borderBottomWidth: 0.5,
    shadowColor: '#efefef',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
    color: '#fff',
    // elevation: 3,
    // backgroundColor: 'white',
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'center',
    color: '#fff',
  },
  leftMenu: {},
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  searchIcon: {flex: 1, top: 10},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  NotificationView: {
    paddingLeft: 10,
  },
  inputContainerStyle: {backgroundColor: '#383D42'},
  input: {backgroundColor: '#2E3238'},
  title: {
    alignSelf: 'center',
    fontSize: 17,
    paddingLeft: 5,
    color: 'white',
  },
});

const NavSearchBox = props => {
  const [text, setText] = useState('');
  return (
    // <SearchBar
    //   containerStyle={{
    //     height: 60,
    //     borderWidth: 1,
    //     borderRadius: 5,
    //   }}
    //   // cancelButtonTitle="Cancel"
    //   onChangeText={text => {
    //     setText(text);
    //     props.onSearch(text);
    //   }}
    //   onClear={() => {
    //     props.setSearchBox();
    //   }}
    //   placeholder="Type Here..."
    //   style={{flex: 1, height: 60}}
    //   value={text}
    //   showCancel
    // />
    <Input
      placeholder="Search Here"
      placeholderTextColor="#6C7883"
      leftIcon={
        <Icon type="evilIcons" name="search" size={20} color="#6C7883" />
      }
      inputStyle={{color: '#6C7883'}}
      rightIcon={
        <Icon
          type="entypo"
          name="cross"
          size={20}
          onPress={() => {
            setText('');
            props.onSearch('');
            props.setSearchBox();
          }}
          // containerStyle={{padding: 10}}
          color="#6C7883"
        />
      }
      onChangeText={text => {
        setText(text);
        props.onSearch(text);
      }}
      inputContainerStyle={styles.input}
      value={text}
      autoFocus
      containerStyle={styles.inputContainerStyle}
    />
  );
};

const HeaderBox = props => {
  const [text, setText] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const isAuthenticated = props.auth && props.auth.isAuthenticated;

  let {onSearch, title, back} = props;

  switch (title) {
    case 'Co-workers':
      onSearch = text => props.getCoworkers('', text);
      break;
    case 'Helpdesk':
      onSearch = text => props.getTickets('', text);
      break;
    case 'Community':
      onSearch = text => props.getCompanies('', text);
      break;
    case 'Club':
      onSearch = text => props.getAllClubs('', text);
      break;
    case 'Partners':
      onSearch = text => props.getPartners('', text);
      break;
    case 'Event':
      onSearch = text => props.getEvents('', text, '');
      break;
    default:
      break;
  }
  if (searchBox) {
    return <NavSearchBox onSearch={onSearch} setSearchBox={setSearchBox} />;
  }
  const navigateNotification = () => {
    if (isAuthenticated) {
      props.navigation.navigate('Notification');
    } else {
      props.setLoginPopup(true);
    }
  };

  const renderLeftIcon = () => {
    if (back) {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.leftMenu}>
          <Icon
            name="arrow-left"
            size={30}
            type="feather"
            color="#fff"
            // iconStyle={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.dispatch(DrawerActions.toggleDrawer());
        }}
        style={styles.leftMenu}>
        <Icon
          name="menu"
          size={30}
          type="entypo"
          color="#fff"
          // iconStyle={{paddingLeft: 10}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {renderLeftIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.headerView}>
        <View>
          {props.isSearch && isAuthenticated && (
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => setSearchBox(true)}>
                <Icon
                  name="search"
                  size={28}
                  // color={AppColors.drawerColor}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isAuthenticated && (
          <TouchableOpacity
            onPress={navigateNotification}
            style={styles.NotificationView}>
            <View>
              <Icon
                type="material-community"
                size={24}
                name="bell-outline"
                // onPress={navigateNotification}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const ReduxHeaderBox = connect(mapStateToProps, {
  getCompanies,
  getCoworkers,
  getTickets,
  getAllClubs,
  getPartners,
  setLoginPopup,
  getEvents,
})(HeaderBox);

const getNavigationOptions = navigationDetails => {
  const {navigation, title, isSearch, back} = navigationDetails;
  const {state} = navigation;
  // const { routeName } = navigation.state.routes[navigation.state.index];
  const {routeName} = navigation.state;
  const {onSearch, onPressSearch} = state.params || {};

  // console.log('\n navigation in options', navigationDetails.navigation.state);

  let routeTitle = '';
  if (title) {
    routeTitle = title || routeName;
  }
  if (state.isDrawerOpen) {
    return {
      headerMode: 'none',
      header: () => null,
    };

    //   return {
    //     title: 'DevX  ',
    //     headerMode: 'none',
    //   };
  }
  // if (searchBox) {
  //   return {
  //     header: () => (
  //       <NavSearchBox onSearch={onSearch} setSearchBox={setSearchBox} />
  //     ),
  //   };
  // }

  return {
    header: () => (
      <ReduxHeaderBox
        onSearch={onSearch}
        title={routeTitle}
        navigation={navigation}
        isSearch={isSearch}
        back={back}
      />
    ),
  };
};

export default getNavigationOptions;
