import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Button from '../components/Button';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const EditProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TextInput mode="outlined" label="First Name" />
      <TextInput mode="outlined" label="Last Name" />
      <TextInput mode="outlined" label="Phone number" />
      <TextInput mode="outlined" label="Car licence plate" />
      <Button onPress={() => alert('btn pressed')}>Update</Button>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
