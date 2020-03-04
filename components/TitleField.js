import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import monoTheme from '../constants/Theme';

const { width } = Dimensions.get('window');

export default function TitleField({
  title = '',
  subTitle = null,
  closeIcon,
  backIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.centralBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {
        closeIcon && (
          <View style={styles.closeIconBox}>
            {closeIcon}
          </View>
        )
      }
      {
        backIcon && (
          <View style={styles.backIconBox}>
            {backIcon}
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //padding: monoTheme.SIZES.BASE,
    //backgroundColor: 'red',
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: 'center',
    position: 'relative',
    width: width - monoTheme.SIZES.BASE * 2,
    //width: width,
    borderBottomColor: monoTheme.COLORS.NEUTRAL,
    borderBottomWidth: 1
  },
  centralBox: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: monoTheme.COLORS.ACTIVE,
    fontSize: monoTheme.SIZES.TITLE,
    marginBottom: monoTheme.SIZES.BASE,
    fontWeight: 'bold'
  },
  subTitle: {
    textAlign: 'center',
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.SUB_TITLE,
  },
  closeIconBox: {
    zIndex: 999,
    position: 'absolute',
    top: monoTheme.SIZES.BASE,
    right: 0,
  },
  backIconBox: {
    zIndex: 999,
    position: 'absolute',
    top: monoTheme.SIZES.BASE + 4,
    left: monoTheme.SIZES.BASE,
  },
});
