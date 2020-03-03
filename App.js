import React from 'react';
import { Block, GalioProvider } from 'galio-framework';
import { StyleSheet, Text, View } from 'react-native';

import AppContainer from './navigation/Screens';
import { monobirzhaTheme } from './constants'

export default function App() {
  return (
    <GalioProvider theme={monobirzhaTheme}>
      <View style={{ flex: 1 }}>
        <AppContainer isLoggedIn={true} />
      </View>
      {/*<Block flex>*/}
      {/*  <View style={styles.container}>*/}
      {/*    <View style={styles.containerBrand}>*/}
      {/*      <View style={styles.border}>*/}
      {/*        <Text style={styles.mono}>*/}
      {/*          mono*/}
      {/*        </Text>*/}
      {/*      </View>*/}
      {/*      <View>*/}
      {/*        <Text style={styles.logo}>*/}
      {/*          birzha*/}
      {/*        </Text>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*    <View>*/}
      {/*      <Text style={styles.desc}>*/}
      {/*        Украинская Биржа*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Block>*/}
    </GalioProvider>
  );
}

const styles = StyleSheet.create({
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
    borderRightColor: '#484848',
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
  }
});
