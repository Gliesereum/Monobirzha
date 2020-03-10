import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import monoTheme from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function InfoField({
  label,
  value,
  containerStyle,
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
    <View style={{ ...styles.container, ...containerStyle, height: isFieldDynamic ? 40 : 28 }}>
      <View style={{ ...styles.labelBox, ...labelBoxStyle}}>
        <Text style={{ ...styles.labelText, ...labelTextStyle }}>
          {label.toUpperCase()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: monoTheme.SIZES.BASE / 2,
    marginBottom: 4,
    height: 40,
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
    color: monoTheme.COLORS.ACTIVE,
    fontSize: monoTheme.SIZES.FONT,
    lineHeight: monoTheme.SIZES.FONT,
  },
  dynamicField: {
    textAlign: 'center',
    paddingHorizontal: monoTheme.SIZES.BASE,
    color: monoTheme.COLORS.SECONDARY,
    backgroundColor: monoTheme.COLORS.PRIMARY,
    width: (width - monoTheme.SIZES.BASE) * 0.5,
    height: monoTheme.SIZES.TITLE * 2,
    fontSize: monoTheme.SIZES.TITLE,
  },
});
