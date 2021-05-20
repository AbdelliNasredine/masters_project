import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RegisterScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../assets/app-icon.png')} /> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Welcome to fog smart parking app</Text>
        <Text style={styles.text}>Sign in with your account</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.signIn}>
            <Text style={styles.textSign}>Getting started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
          </View>
        </TouchableOpacity>
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
  },
  button: {
    // alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#1A6CC7',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
