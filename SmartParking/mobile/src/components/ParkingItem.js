import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ParkingItem({
  id,
  name,
  description,
  address,
  rentPrice,
  lat,
  lon,
  onClick,
}) {
  return (
    <View style={styles.parkingItem}>
      <View style={styles.parkingItemDescription}>
        <Text style={styles.parkingName}>{name}</Text>
        <Text style={styles.parkingDescription}>1km | {description}</Text>
        <Text style={styles.parkingSize}>{address}</Text>
      </View>
      <View style={styles.parkingItemActions}>
        <TouchableOpacity
          style={styles.parkingItemButton}
          onPress={() => onClick(id)}>
          <Icon name="eye" size={16} />
          <Text style={styles.parkingItemButtonText}>Show</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parkingItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 6,
  },
  parkingItemDescription: {
    paddingVertical: 10,
  },
  parkingName: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  parkingDescription: {
    color: 'gray',
  },
  parkingSize: {
    color: 'gray',
  },
  parkingItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingItemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#E2E4E8',
  },
  parkingItemButtonAlt: {
    backgroundColor: '#1A6CC7',
  },
  parkingItemButtonText: {
    fontSize: 12,
    paddingLeft: 4,
  },
  parkingItemButtonTextAlt: {
    color: '#fff',
  },
});
