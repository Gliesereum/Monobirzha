import {StyleSheet, View} from 'react-native';
import React from 'react';

function Separator() {
  return (
    <View style={styles.root}/>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
    borderBottomColor: '#4e4e4e',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default Separator
