import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import Button from '../components/Button';
import Feather from 'react-native-vector-icons/Feather';

import {register} from '../services/AuthServices';

export default function ({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = val => {
    setUserName(val);
  };

  const onPasswordChange = val => {
    setPassword(val);
  };

  const onRegisterPressed = async () => {
    const data = await register(username, password);
    if (data.status === 400) {
      Alert.alert('Error', data.msg, [{text: 'OK'}]);
      return;
    } else {
      Alert.alert('Success', 'Your account has been created', [{text: 'OK'}]);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Registration</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.field}>
          <Text styles={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <Feather name="user" color="#E2E4E8" size={20} />
            <TextInput
              defaultValue={username}
              placeholder="Your username"
              style={styles.textInput}
              onChangeText={val => onUsernameChange(val)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text styles={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#E2E4E8" size={20} />
            <TextInput
              defaultValue={password}
              placeholder="Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={val => onPasswordChange(val)}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Button onPress={onRegisterPressed}>Register</Button>
          <Button alt onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
          {/* <TouchableOpacity style={styles.button} onPress={onRegisterPressed}>
            <Text style={styles.textSign}>Register</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonRegister]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textRegister}>Login</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#BEC1C7',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 5,
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
