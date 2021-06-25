import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../components/Loader';

import {AuthContext} from '../components/context';
import {getUserInformation} from '../services/AuthServices';

export default function ({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [reservationCount, setReservationCount] = useState(0);
  const {authContext, loginState} = useContext(AuthContext);

  const onMount = async () => {
    setIsLoading(true);
    const {user, reservationCount} = await getUserInformation(
      loginState.userToken,
    );
    setUser(user);
    setReservationCount(reservationCount);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      onMount();
    }, []),
  );

  if (!user || isLoading) {
    return <Loader />;
  }

  const {userInfo} = user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <Avatar.Text
            label={userInfo.firstName[0] + userInfo.lastName[0]}
            size={48}
          />
          <View style={{marginLeft: 20}}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {userInfo.firstName} {userInfo.lastName}
            </Title>
            <Caption style={styles.caption}>@{user.username}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>
            {userInfo.phoneNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="car" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>
            {userInfo.licencePlate}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title>{userInfo.balance} DA</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>{reservationCount}</Title>
          <Caption>Reservations</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="ticket-confirmation" color="#1A6CC7" size={25} />
            <Text style={styles.menuItemText}>Reservations History</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#1A6CC7" size={25} />
            <Text style={styles.menuItemText}>Payments History</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            authContext.logout();
          }}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#1A6CC7" size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26,
  },
});
