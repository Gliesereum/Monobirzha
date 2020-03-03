import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import InfoField from '../components/InfoField';

export default function BondSingle({ singleBond, ...props }) {
  return (
    <View style={styles.container}>
      <InfoField />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {

  }
});
