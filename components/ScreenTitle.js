import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { monoTheme } from '../constants';

export default function ScreenTitle({ title }) {
  return (
    <View style={styles.titleBox}>
      <Text style={styles.titleText}>
        {title}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  titleBox: {
  },
  titleText: {
    color: monoTheme.COLORS.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: 8,
    fontSize: monoTheme.SIZES.TITLE,
  },
});
