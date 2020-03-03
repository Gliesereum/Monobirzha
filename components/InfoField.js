import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoField(props) {
  return (
    <View style={styles.container}>
      <View style={styles.labelBox}><Text>Right</Text></View>
      <View style={styles.valueBox}><Text>Left</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  labelBox: {

  },
  valueBox: {

  },
});
