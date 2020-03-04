import React, {Component, Fragment} from 'react'
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import {GalioProvider} from 'galio-framework';
import {connect} from 'react-redux';
import LottieView from "lottie-react-native";
import {startApp} from './state/actions/startApp';
import Loading from "./patch/Loading";

import {monoTheme} from './constants';
import AppContainer from './navigation/Screens';

class Delegate extends Component {

  componentDidMount() {
    this.props.startApp();
  }

  render() {
    const {root, auth} = this.props.mono;
    return (
      <GalioProvider theme={monoTheme}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.root}>
          {root.loading ? (
            <View style={styles.root}>
              <Loading
                color={'#3ECD9A'}
                size={'small'}
              />
            </View>
          ) : (
            <AppContainer
              isLoggedIn={!!auth.token}
              brokerId={auth.brokerId}
            />
          )
          }
        </View>
      </GalioProvider>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  containerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 8,
    borderRightColor: '#CD603E',
    marginRight: 8
  },
  mono: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 10
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3ECD9A'
  },
  desc: {
    fontSize: 14,
    marginTop: 16,
    color: '#fff'
  },
});

export default connect(state => state, {
  startApp
})(Delegate)
