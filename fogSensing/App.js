import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 5.0,
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  androidProvider: 'auto',
  interval: 5000,
  fastestInterval: 10000,
  maxWaitTime: 5000,
});

class App extends Component {
  state = {
    location: null,
    loading: false,
  };

  // lifecycle methods
  componentDidMount() {
    const options = {
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    };
    RNLocation.checkPermission(options);
  }

  _onCoordinatesSuccess = position => {
    const location = JSON.stringify(position);
    this.setState({location});
  };

  _onCoordinatesFailed = error => {
    Alert.alert(error.message);
  };

  findCoordinates = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    };
    navigator.geolocation.getCurrentPosition(
      this._onCoordinatesSuccess,
      this._onCoordinatesFailed,
      options,
    );
  };

  permissionHandle = async () => {
    console.log('in permission call');
    const options = {
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    };
    let permission = await RNLocation.requestPermission(options);
    console.log(permission);
    let location = await RNLocation.getLatestLocation({timeout: 100});
    this.setState({location});
  };

  showLocationData = () => {
    const {location} = this.state;
    const result = [];
    for (const attribute in location) {
      result.push(
        <Text key={Math.random() + 100}>
          {attribute}: {location[attribute]}
        </Text>,
      );
    }
    return result;
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Fog Sensing</Text>
          <Text style={styles.sectionText}>
            Reading gps coordinates, speed and acceleration of phone device
          </Text>
          {this.state.location ? (
            <View style={styles.resultContainer}>
              {this.showLocationData()}
            </View>
          ) : null}
        </View>
        <TouchableOpacity onPress={this.permissionHandle}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Show Data</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const colors = {
  darkblue: '#0A5687',
  lightblue: '#E7F0F5',
  yellow: '#FAD060',
  orange: '#F2954F',
  green: '#6CC7A6',
  white: '#FCFDFD',
  black: '#414141',
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.darkblue,
  },
  container: {
    padding: 16,
    backgroundColor: colors.white,
  },
  sectionText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.black,
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.lightblue,
  },
  buttonText: {
    color: colors.darkblue,
    textAlign: 'center',
    padding: 20,
    textTransform: 'uppercase',
  },
  resultContainer: {
    marginTop: 8,
    paddingVertical: 8,
  },
});

export default App;
