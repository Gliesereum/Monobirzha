import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

import monoTheme from '../constants/Theme'

const { height, width } = Dimensions.get('window');

export default function ListItem({ item, onPressItem, onElectItem }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{item.name}</Text>
        <Text style={styles.infoDescr}>{item.description}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.iconBox} onPress={onElectItem}>
        <Ionicons
          style={{ alignSelf:'center' }}
          name={item.isFavorite ? 'ios-star' : 'ios-star-outline'}
          size={32}
          color={monoTheme.COLORS[item.isFavorite ? 'ACTIVE' : 'PRIMARY']}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: monoTheme.SIZES.BASE,
    borderWidth: 1,
    borderColor: monoTheme.COLORS.NEUTRAL,
    borderRadius: 5,
  },
  infoBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoTitle: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: 18,
    marginBottom: 8,
  },
  infoDescr: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: 14,
  },
});
