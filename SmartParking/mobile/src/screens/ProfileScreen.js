import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {AuthContext} from '../components/context';

export default function ({navigation}) {
  const {authContext, loginState} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Button onPress={() => authContext.logout()}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
  },
});

// "react": "17.0.1"
