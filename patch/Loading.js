import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';

function Loading({color, size}) {
  return(
    <View style={styles.root}>
      <ActivityIndicator
        size={size}
        color={color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});

export default Loading;
