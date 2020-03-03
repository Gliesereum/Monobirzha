import React, {Component, Fragment} from 'react'
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux';
import {startApp} from './state/actions/startApp';
import Loading from "./patch/Loading";

class Delegate extends Component {

  componentDidMount() {
    this.props.startApp();
  }

  render() {
    const {root} = this.props.mono;
    return(
      <Fragment>
        <StatusBar barStyle="light-content"/>
        {root.loading ? (
          <View style={styles.root}>
            <Loading
              color={'#3ECD9A'}
              size={'large'}
            />
          </View>
        ) : (
          <View style={styles.root}>
            <View style={styles.container}>
              <View style={styles.containerBrand}>
                <View style={styles.border}>
                  <Text style={styles.mono}>
                    mono
                  </Text>
                </View>
                <View>
                  <Text style={styles.logo}>
                    birzha
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.desc}>
                  Украинская Биржа
                </Text>
              </View>
            </View>
          </View>
        )}
      </Fragment>
    )
  }
}

const styles =  StyleSheet.create({
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
