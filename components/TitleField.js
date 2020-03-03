import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import monoTheme from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function TitleField({
  title = '',
  subTitle = null,
  closeIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.centralBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {
        closeIcon && (
          <View style={styles.iconBox}>
            {closeIcon}
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: monoTheme.SIZES.BASE,
    alignItems: 'center',
    position: 'relative',
    width: width - monoTheme.SIZES.BASE * 2,
  },
  centralBox: {
    justifyContent: 'center',
  },
  iconBox: {
    zIndex: 999,
    position: 'absolute',
    top: monoTheme.SIZES.BASE,
    right: monoTheme.SIZES.BASE,
  },
  title: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.TITLE,
    marginBottom: monoTheme.SIZES.BASE,
  },
  subTitle: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.SUB_TITLE,
  },
});
