import React, {useContext, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Paragraph,
  Title,
  Text,
  ActivityIndicator,
  Colors,
  List,
  Button,
} from 'react-native-paper';

import {useFocusEffect} from '@react-navigation/native';

import {AuthContext} from '../components/context';
import {
  getCurrentReservationStatus,
  checkout,
} from '../services/ParkingAreaService';

export default function ({navigation}) {
  const {loginState} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('erro');
  const [reservation, setReservation] = useState(null);
  const [time, setTime] = useState('');

  const onMount = async () => {
    setLoading(true);
    const response = await getCurrentReservationStatus(loginState.userToken);
    console.log(response);
    if (response.error) {
      setError(response.error);
    } else {
      setError('');
      setReservation(response);
    }
    console.log(response);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      onMount();
    }, []),
  );

  const getStatus = reservation => {
    if (!reservation.status) {
      return "You haven't parked your car yet";
    } else {
      return 'Pending';
    }
  };

  const handleCheckOut = async () => {
    const response = await checkout(loginState.userToken);
    if (response.success) {
      Alert.alert('Success', response.success);
      await onMount();
    } else {
      Alert.alert('Error', 'Some error happened , please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Title>Reservation Screen</Title>
      <Paragraph>View your current reservation status</Paragraph>
      <ScrollView style={styles.scroll}>
        {loading ? (
          <View style={{paddingVertical: 16}}>
            <ActivityIndicator
              size="large"
              animating={true}
              color={Colors.blue400}
            />
          </View>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <>
            <List.Section>
              <List.Subheader>Current Reservation Details</List.Subheader>
              <List.Item
                title="Parking Number"
                description={reservation.parking_id}
              />
              <List.Item
                title="Spot Number"
                description={reservation.spot_id}
              />
              <List.Item title="Status" description={getStatus(reservation)} />
              <List.Item
                title="Start Date"
                description={reservation.startDate}
              />
              <List.Item
                title="Amount Payed"
                description={`${reservation.amount} DA`}
              />
            </List.Section>
            {reservation.status ? (
              <Button
                mode="contained"
                color={Colors.blue500}
                onPress={() => handleCheckOut()}>
                Check Out
              </Button>
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  scroll: {
    // paddingVertical: 4,
  },
});
