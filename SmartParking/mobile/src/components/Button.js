import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Button({onPress, children, alt}) {
  const btnStyle = alt ? styles.buttonStyleAlt : styles.buttonStyle;
  const txtStyle = alt ? styles.textStyleAlt : styles.textStyle;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={btnStyle}>
        <Text style={txtStyle}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  textStyleAlt: {
    color: '#1A6CC7',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#1A6CC7',
    borderRadius: 100,
    marginVertical: 5,
    padding: 16,
  },
  buttonStyleAlt: {
    borderColor: '#1A6CC7',
    borderWidth: 1,
    borderRadius: 100,
    marginVertical: 5,
    padding: 16,
  },
});
