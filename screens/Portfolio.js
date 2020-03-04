import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

class Portfolio extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 50, color: 'yellow' }}>Portfolio</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default connect(state => state)(Portfolio);
