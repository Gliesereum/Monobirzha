import React, { Component } from 'react';
import { View,  Text } from 'react-native'
import { connect } from 'react-redux';

class BankId extends Component {
  render() {
    const {auth} = this.props.mono;
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Text>BANK ID Authorization</Text>
      </View>
    )
  }
}

export default connect(state => state)(BankId)
