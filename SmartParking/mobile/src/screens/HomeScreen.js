import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {AuthContext} from '../components/context';

export default function ({navigation}) {
  const {authContext} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="logout"
        onPress={() => {
          authContext.logout();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
