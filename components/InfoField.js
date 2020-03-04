import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import monoTheme from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function InfoField({
  label,
  value,
  labelBoxStyle,
  valueBoxStyle,
  labelTextStyle,
  valueTextStyle,
  isFieldDynamic = false,
  defaultValue,
  dynamicFieldStyle,
  onFieldChange,
}) {
  return (
    <View style={{ ...styles.container, borderBottomWidth: isFieldDynamic ? 0 : 1 }}>
      <View style={{ ...styles.labelBox, ...labelBoxStyle}}>
        <Text style={{ ...styles.labelText, ...labelTextStyle }}>
          {label}
        </Text>
      </View>
      <View style={{ ...styles.valueBox, ...valueBoxStyle }}>
      {
        isFieldDynamic ? (
          <TextInput
            defaultValue={defaultValue}
            keyboardType='number-pad'
            keyboardAppearance="dark"
            style={{ ...styles.dynamicField, ...dynamicFieldStyle }}
            onChangeText={onFieldChange}
          />
        ) : (
          <Text style={{ ...styles.valueText, ...valueTextStyle }}>
            {value}
          </Text>
        )
      }
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
    borderBottomColor: monoTheme.COLORS.PRIMARY,
    height: 48,
    padding: monoTheme.SIZES.BASE,
    marginBottom: monoTheme.SIZES.BASE,
  },
  labelBox: {

  },
  labelText: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.FONT,
    lineHeight: monoTheme.SIZES.FONT,
  },
  valueBox: {

  },
  valueText: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.FONT,
    lineHeight: monoTheme.SIZES.FONT,
  },
  dynamicField: {
    textAlign: 'center',
    paddingHorizontal: monoTheme.SIZES.BASE,
    color: monoTheme.COLORS.SECONDARY,
    backgroundColor: monoTheme.COLORS.PRIMARY,
    width: (width - monoTheme.SIZES.BASE) * 0.5,
    height: 32,
    fontSize: 14,
  },
});
