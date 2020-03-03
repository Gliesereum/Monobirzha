import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import monobirzhaTheme from '../constants/Theme';

export default function InfoField({
  label,
  value,
  labelBoxStyle,
  valueBoxStyle,
  labelTextStyle,
  valueTextStyle,
}) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.labelBox, ...labelBoxStyle}}>
        <Text style={{ ...styles.labelText, ...labelTextStyle }}>
          {label}
        </Text>
      </View>
      <View style={{ ...styles.valueBox, ...valueBoxStyle }}>
        <Text style={{ ...styles.valueText, ...valueTextStyle }}>
          {value}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: monobirzhaTheme.COLORS.PRIMARY,
    borderBottomWidth: 1,
    height: 48,
    padding: monobirzhaTheme.SIZES.BASE,
    marginBottom: monobirzhaTheme.SIZES.BASE,
  },
  labelBox: {

  },
  labelText: {
    color: monobirzhaTheme.COLORS.PRIMARY,
    fontSize: monobirzhaTheme.SIZES.FONT,
    lineHeight: monobirzhaTheme.SIZES.FONT,
  },
  valueBox: {

  },
  valueText: {
    color: monobirzhaTheme.COLORS.PRIMARY,
    fontSize: monobirzhaTheme.SIZES.FONT,
    lineHeight: monobirzhaTheme.SIZES.FONT,
  }
});
