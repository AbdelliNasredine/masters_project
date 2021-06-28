import React, {useState, useContext, useEffect, useCallback} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import ParkingItem from '../components/ParkingItem';
import Loader from '../components/Loader';

import {
  Title,
  Button,
  Paragraph,
  Text,
  Divider,
  IconButton,
  ActivityIndicator,
  Portal,
  Dialog,
  Colors,
} from 'react-native-paper';

import {useFocusEffect} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../components/context';
import {findAllParkingAreas, reserveSpot} from '../services/ParkingAreaService';

import MQTT from 'sp-react-native-mqtt';
import {MQTT_BROKER_URL} from '../constants';

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

  const {loginState} = useContext(AuthContext);

  async function getAreas() {
    setIsLoading(true);
    const parkings = await findAllParkingAreas(loginState.userToken);
    setParkingAreas(parkings);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getAreas();
    }, []),
  );

  const clickHandler = id => {
    navigation.navigate('Parks', {
      screen: 'Parking Details',
      params: {
        parking: parkingAreas.filter(p => p.id === id),
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <ScrollView style={styles.container}>
        {parkingAreas.map(p => (
          <ParkingItem key={p.id} onClick={clickHandler} {...p} />
        ))}
      </ScrollView>
    );
  }
}

function ParkinSpot({id, status, onReserve}) {
  const free = status === 'FREE';
  const style = free ? styles.free : styles.occupied;

  return (
    <View style={[styles.spot, style]}>
      <Text style={[styles.spotText, style.textFree]}>
        {free ? 'FREE' : 'OCCUPIED'}
      </Text>
      {free ? (
        <Button
          mode="contained"
          style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
          icon="ticket"
          color={Colors.green500}
          onPress={() => {
            onReserve(id);
          }}>
          reserve
        </Button>
      ) : null}
    </View>
  );
}

class ParkinSpotsContainer extends React.Component {
  state = {
    isLoading: true,
    visible: false,
    spots: [],
  };

  constructor(props) {
    super(props);
    this.id = this.props.id;
  }

  updateState = spots => {
    this.setState({spots, isLoading: false});
  };

  onChange = msg => {
    const id = this.id;
    if (msg.topic.trim() === `parking/${id}`) {
      const {data} = msg;
      const spots = data
        .split(' ')
        .filter(s => s.length !== 0)
        .map(s => {
          const split = s.split(',');
          return {
            id: split[0],
            status: split[1],
          };
        });
      console.log(spots);
      this.updateState(spots);
    } else {
      console.log('Wrong Topic');
    }
  };

  async componentDidMount() {
    const id = this.id;
    try {
      MQTT.createClient({
        uri: MQTT_BROKER_URL,
        clientId: 'mobile',
      }).then(client => {
        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });
        client.on('connect', function () {
          client.subscribe(`parking/${id}`, 0);
        });
        client.on('message', this.onChange);
        client.connect();
      });
    } catch (e) {}
  }

  async componentWillUnmount() {}

  showDialog = () => this.setState({visible: true});
  hideDialog = () => this.setState({visible: false});

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.spotsContainer}>
        {this.state.spots.map(s => (
          <ParkinSpot
            id={s.id}
            status={s.status}
            key={s.id}
            onReserve={this.props.onReserve}
          />
        ))}
      </View>
    );
  }
}

function ParkingDetails({route, navigation}) {
  const [parking] = route.params.parking;

  const [spotId, setSpotId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const {authContext, loginState} = useContext(AuthContext);

  const handleReservation = id => {
    // show confirmation
    showDialog();
    setSpotId(id);
  };

  const processReservation = async () => {
    if (spotId) {
      setLoading(true);
      const response = await reserveSpot(
        loginState.userToken,
        parking.id,
        spotId,
      );
      setLoading(false);
      hideDialog();
      if (response.error) {
        Alert.alert('Error', response.error);
      }
      if (response.success) {
        Alert.alert('Success', response.success);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.padding}>{parking.name}</Title>
      <Divider />
      <Paragraph style={styles.padding}>
        <Text>Description: {parking.description}</Text>
        <Divider />
        <Text>
          parking Fee:
          {parking.rentPrice === 0 ? 'FREE' : `${parking.rentPrice} DA`}
        </Text>
        <Divider />
      </Paragraph>
      <Divider />
      <Text style={styles.padding}>Parking Spots</Text>
      <ScrollView>
        <ParkinSpotsContainer
          id={parking.id}
          navigation={navigation}
          onReserve={handleReservation}
        />
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            Reservation {!loading ? 'Confirmation' : 'Processing'}
          </Dialog.Title>
          <Dialog.Content>
            {!loading ? (
              <Paragraph>
                By clicking on the reserve button, parking fee will ve reduced
                from you account, do agree ?
              </Paragraph>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <ActivityIndicator
                    animating={true}
                    color={Colors.purple400}
                  />
                </View>
                <Paragraph style={{marginLeft: 23}}>Please wait...</Paragraph>
              </View>
            )}
          </Dialog.Content>
          {!loading ? (
            <Dialog.Actions>
              <Button
                style={{marginHorizontal: 12}}
                mode="contained"
                onPress={processReservation}>
                I agree
              </Button>
              <Button mode="contained" onPress={hideDialog}>
                Cancel
              </Button>
            </Dialog.Actions>
          ) : null}
        </Dialog>
      </Portal>
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
  padding: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    // paddingHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  spotsContainer: {
    // width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spot: {
    borderRadius: 6,
    margin: 8,
    backgroundColor: '#ccc',
    padding: 32,
    width: 160,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  spotText: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  textFree: {
    color: Colors.green600,
  },
  textOccupaied: {
    color: Colors.red600,
  },
  free: {
    borderColor: Colors.green500,
    backgroundColor: Colors.green100,
    borderWidth: 1,
  },
  occupied: {
    borderColor: '#e91010',
    backgroundColor: '#ffdcdc',
    borderWidth: 1,
  },
});
