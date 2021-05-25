import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import ParkingItem from '../components/ParkingItem';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../components/context';
import {findAllParkingAreas} from '../services/ParkingAreaService';

const ParkingStack = createStackNavigator();

function ParkingStackPage() {
  return (
    <ParkingStack.Navigator>
      <ParkingStack.Screen name="Parking Areas" component={ParkingMain} />
      <ParkingStack.Screen name="Parking Details" component={ParkingDetails} />
    </ParkingStack.Navigator>
  );
}

function ParkingMain({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [parkingAreas, setParkingAreas] = useState(null);

  const {authContext, loginState} = useContext(AuthContext);

  useEffect(() => {
    async function getAreas() {
      setIsLoading(true);
      const parkings = await findAllParkingAreas(loginState.userToken);
      setParkingAreas(parkings);
      setIsLoading(false);
    }
    getAreas();
  }, [loginState.userToken]);

  const clickHandler = id => {
    navigation.navigate('Parks', {
      screen: 'Parking Details',
      params: {
        parking: parkingAreas.filter(p => p.id === id),
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={{opacity: 1}}
          color="#1A6CC7"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {parkingAreas.map(p => (
          <ParkingItem key={p.id} onClick={clickHandler} {...p} />
        ))}
      </View>
    );
  }
}

function ParkingDetails({route, navigation}) {
  const {parking} = route.params;

  return (
    <View>
      <Text>Details {JSON.stringify(parking)}</Text>
    </View>
  );
}

export default function () {
  return <ParkingStackPage />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
