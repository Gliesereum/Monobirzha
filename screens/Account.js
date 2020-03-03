import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import { monoTheme } from '../constants';

class Account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Account</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default connect(state => state, {})(Account);
