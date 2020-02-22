import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, FlatList, Image, Alert} from 'react-native';
import DashboardCard from './DashboardCard';
import CardView from '../../common/CardView';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    padding: 5,
  },
  cardContainer: {
    width: '48%',
    margin: 3,
  },
});

const Dashboard = props => {
  const navigation = useNavigation();

  const dashboardItem = [
    {
      id: 1,
      value: 'Attendance',
    },
    {
      id: 2,
      value: 'Daily Task Board',
    },
    {
      id: 3,
      value: 'Training Board',
    },
    {
      id: 4,
      value: 'Daily Team Review',
    },
  ];
  const [data, setData] = useState(dashboardItem);

  const onCardClick = index => {
    navigation.navigate('WorkerList');
  };
  const renderItem = (item, index) => {
    return (
      <CardView item={item} cardContainer={styles.cardContainer}>
        <DashboardCard item={item} onPress={() => onCardClick(item.item.id)} />
      </CardView>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Dashboard;
