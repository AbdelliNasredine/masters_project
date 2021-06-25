import React from 'react';
import {Button} from 'react-native-paper';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function MyButton({onPress, children, alt}) {
  // const btnStyle = alt ? styles.buttonStyleAlt : styles.buttonStyle;
  // const txtStyle = alt ? styles.textStyleAlt : styles.textStyle;

  return (
    // <TouchableOpacity onPress={onPress}>
    //   <View style={btnStyle}>
    //     <Text style={txtStyle}>{children}</Text>
    //   </View>
    // </TouchableOpacity>
    <Button
      style={styles.button}
      mode={alt ? 'text' : 'contained'}
      onPress={onPress}>
      {children}
    </Button>
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
  },
});
