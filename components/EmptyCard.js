import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { monoTheme } from '../constants';

export default function EmptyCard({ title }) {
  return (
    <View style={styles.container}>
      <Entypo
        style={{alignSelf: 'center'}}
        name="folder"
        size={monoTheme.SIZES.TITLE * 2}
        color={monoTheme.COLORS.MONO}
      />
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: monoTheme.SIZES.BASE,
    borderWidth: 2,
    borderColor: monoTheme.COLORS.ACTIVE,
    borderRadius: 5,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: monoTheme.SIZES.FONT,
    fontWeight: 'bold',
    color: monoTheme.COLORS.MONO,
    paddingTop: monoTheme.SIZES.BASE,
  },
});
