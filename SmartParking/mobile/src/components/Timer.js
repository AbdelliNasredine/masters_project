import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native-paper';

export default function (props) {
  const startTime = props.start;
  return (
    <View>
      <Text style={styles.text}>{startTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
