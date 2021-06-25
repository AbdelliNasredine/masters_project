import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default function () {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        size="large"
        style={{opacity: 1}}
        color="#1A6CC7"
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
