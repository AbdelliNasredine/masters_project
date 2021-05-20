import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Find parking spot Screen</Text>
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
