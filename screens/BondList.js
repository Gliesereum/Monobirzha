import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, View, Text } from 'react-native';

import ListItem from '../components/ListItem';

import { getOvdpDetails } from '../state/actions/getOvdpDetails';
import { monoTheme } from '../constants';

const { width } = Dimensions.get('window');

class BondList extends Component {
  handlePressItem = async (id) => {
    const { navigation, getOvdpDetails } = this.props;

    await getOvdpDetails({ id });
    navigation.navigate('BondInfoModal');
  };

  handleElectItem = () => {
    // onElectItem();
  };

  render() {
    const { mono } = this.props;
    const { ovdpList } = mono;

    return (
      <SafeAreaView style={styles.container}>
        <View style={{
          height: 50,
          borderBottomColor: monoTheme.COLORS.NEUTRAL,
          borderBottomWidth: 1,
          justifyContent: 'center',
        }}>
          <Text style={{
            color: '#ccc',
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Ринок ОВДП
          </Text>
        </View>
        <View style={styles.innerPadding}>
          <FlatList
            data={ovdpList.map(item => ({
              name: item.cpcode,
              description: item.emit_name,
              startDate: item.razm_date,
              aukProc: item.auk_proc,
              isFavorite: true,
              id: item.id,
            }))}
            renderItem={({ item }) => ListItem({
              item,
              onPressItem: this.handlePressItem,
              onElectItem: this.handleElectItem,
            })}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: monoTheme.SIZES.BASE * 2,
    flex: 1,
    width: width,
    backgroundColor: monoTheme.COLORS.SECONDARY,
  },
  innerPadding: {
    paddingHorizontal: monoTheme.SIZES.BASE,
  },
});

export default connect(state => state, {
  getOvdpDetails,
})(BondList);
