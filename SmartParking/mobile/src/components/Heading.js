import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function Heading({children, props}) {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
});
