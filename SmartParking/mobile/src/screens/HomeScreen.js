import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screen = Dimensions.get('screen');

export default function ({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title>Welcome </Title>
        <Paragraph>This is the home screen of our app</Paragraph>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Parks')}>
          <Icon style={styles.buttonText} name="parking" size={48} />
          <Title style={styles.buttonText}>View all parking areas</Title>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}>
          <Icon style={styles.buttonText} name="face-profile" size={48} />
          <Title style={styles.buttonText}>View Profile</Title>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    flex: 1,
    paddingVertical: 12,
  },
  body: {
    flex: 4,
    flexDirection: 'column',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#1A6CC7',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    margin: 6,
  },
  buttonText: {
    color: '#fff',
  },
});
