import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import monobirzhaTheme from '../constants/Theme';

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
    padding: monobirzhaTheme.SIZES.BASE,
    alignItems: 'center',
    position: 'relative',
    width: width - monobirzhaTheme.SIZES.BASE * 2,
  },
  centralBox: {
    justifyContent: 'center',
  },
  iconBox: {
    zIndex: 999,
    position: 'absolute',
    top: monobirzhaTheme.SIZES.BASE,
    right: monobirzhaTheme.SIZES.BASE,
  },
  title: {
    color: monobirzhaTheme.COLORS.PRIMARY,
    fontSize: monobirzhaTheme.SIZES.TITLE,
    marginBottom: monobirzhaTheme.SIZES.BASE,
  },
  subTitle: {
    color: monobirzhaTheme.COLORS.PRIMARY,
    fontSize: monobirzhaTheme.SIZES.SUB_TITLE,
  },
});
