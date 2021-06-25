import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native-paper';
// import {} from "mome"

export default function (props) {
  const startTime = props.start;
  // const formatDoccument = (time) => {

  // }
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
