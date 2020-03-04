import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import monoTheme from '../constants/Theme'

const { width } = Dimensions.get('window');

export default function ListItem({ item, onPressItem, onElectItem }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressItem(item.name)}
      activeOpacity={0.5}
    >
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.infoDescr}>{item.description}</Text>
        <View style={styles.startDateBox}>
          <Text style={styles.startDateLabel}>Дата розміщення</Text>
          <Text style={styles.startDateValue}>{item.startDate}</Text>
        </View>
        <View style={styles.aukProcBox}>
          <Text style={styles.aukProcLabel}>Відсоткова ставка, %</Text>
          <Text style={styles.aukProcValue}>{item.aukProc}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.iconBox}
        onPress={onElectItem}
      >
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
    height: 160,
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
    width: width - (monoTheme.SIZES.BASE * 2) - (width * 0.2),
  },
  infoTitle: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: 16,
    marginBottom: 8,
  },
  infoDescr: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: 12,
    marginBottom: 8,
  },
  startDateBox: {
    marginBottom: 8,
  },
  startDateLabel: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: 12,
  },
  startDateValue: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: 12,
  },
  aukProcBox: {
    marginBottom: 8,
  },
  aukProcLabel: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: 12,
  },
  aukProcValue: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: 12,
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
