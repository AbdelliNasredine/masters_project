import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

export default function RegisterScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../assets/app-icon.png')} /> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Welcome to fog smart parking app</Text>
        <Text style={styles.text}>Sign in with your account</Text>
        <Button onPress={() => navigation.navigate('Login')}>
          Getting Started
        </Button>
      </View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEC1C7',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#333C48',
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    color: '#BEC1C7',
    marginTop: 5,
    marginBottom: 10,
  },
});
