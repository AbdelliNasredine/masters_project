import React, {useState, useContext} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';

import {ActivityIndicator, Colors, Button} from 'react-native-paper';

// import Button from '../components/Button';
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {authenticate} from '../services/AuthServices';
import {AuthContext} from '../components/context';

export default function ({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useContext(AuthContext);

  const onPhoneNumberChange = val => {
    setUserName(val);
  };

  const onPasswordChange = val => {
    setPassword(val);
  };

  const onLoginPresses = async () => {
    setIsLoading(true);
    const data = await authenticate(username, password);
    setIsLoading(false);
    if (data.status === 400) {
      Alert.alert('Wrong Credentials', data.msg, [{text: 'OK'}]);
      return;
    }
    const userToken = data.accessToken;
    await AsyncStorage.setItem('userToken', userToken);
    dispatch({type: 'LOGIN', token: userToken, username});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Login</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.field}>
          <Text styles={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <Feather name="user" color="#E2E4E8" size={20} />
            <TextInput
              defaultValue={username}
              placeholder="Your Username"
              style={styles.textInput}
              onChangeText={val => onPhoneNumberChange(val)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text styles={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#E2E4E8" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={val => onPasswordChange(val)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Button mode="contained" onPress={onLoginPresses}>
            Login
          </Button>
          <Button alt onPress={() => navigation.navigate('Register')}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 35,
  },
  container: {
    flex: 1,
    backgroundColor: '#BEC1C7',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E8',
    // paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#000',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    marginVertical: 8,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#1A6CC7',
  },
  buttonRegister: {
    backgroundColor: 'transparent',
    color: '#1A6CC7',
    borderColor: '#1A6CC7',
    borderWidth: 1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    color: '#fff',
    fontSize: 16,
  },
  textRegister: {
    color: '#1A6CC7',
    fontSize: 16,
  },
});
