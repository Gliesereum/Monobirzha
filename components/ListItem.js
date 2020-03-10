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
        <Text style={styles.infoTitle} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.startDateBox}>
          <Text style={styles.startDateLabel}>
            Емітент
          </Text>
          <Text style={styles.startDateValue}>
            {item.description}
          </Text>
        </View>

        <View style={styles.startDateBox}>
          <Text style={styles.startDateLabel}>
            Дата розміщення
          </Text>
          <Text style={styles.startDateValue}>
            {item.startDate}
          </Text>
        </View>

        <View style={styles.aukProcBox}>
          <Text style={styles.aukProcLabel}>
            Відсоткова ставка, %
          </Text>
          <Text style={styles.aukProcValue}>
            {item.aukProc}
          </Text>
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
          size={24}
          color={monoTheme.COLORS[item.isFavorite ? 'ACTIVE' : 'PRIMARY']}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    borderWidth: 2,
    borderBottomColor: monoTheme.COLORS.NEUTRAL,
  },
  infoBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: width - (monoTheme.SIZES.BASE * 2) - (width * 0.2),
  },
  infoTitle: {
    color: monoTheme.COLORS.MONO,
    fontSize: monoTheme.SIZES.TITLE,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  infoDesc: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.FONT,
    marginBottom: 2,
  },
  startDateBox: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  startDateLabel: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: monoTheme.SIZES.FONT,
  },
  startDateValue: {
    color: monoTheme.COLORS.ACTIVE,
    lineHeight: 16,
    fontSize: monoTheme.SIZES.FONT,
    marginLeft: 4,
    fontWeight: 'bold'
  },
  aukProcBox: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  aukProcLabel: {
    color: monoTheme.COLORS.PRIMARY,
    lineHeight: 16,
    fontSize: monoTheme.SIZES.FONT,
  },
  aukProcValue: {
    color: monoTheme.COLORS.ACTIVE,
    lineHeight: 16,
    fontSize: monoTheme.SIZES.FONT,
    marginLeft: 4,
    fontWeight: 'bold'
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
