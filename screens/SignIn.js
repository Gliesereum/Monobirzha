import React, { Component } from 'react';
import { Block, Text } from 'galio-framework';
import { connect } from 'react-redux';
//import {startApp} from "../state/actions/startApp";

class SignIn extends Component {
  render() {
    return(
      <Block flex>
        <Text>Sign In</Text>
      </Block>
    )
  }
}

export default connect(state => state)(SignIn)
