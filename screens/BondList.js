import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, View } from 'react-native';

import ListItem from '../components/ListItem';

import { monoTheme } from '../constants';

const { width } = Dimensions.get('window');

class BondList extends Component {
  handlePressItem = () => {
    // onPressItem();
    // navigation.navigate('BondModal');
  };

  handleElectItem = () => {
    // onElectItem();
  };

  render() {
    const {
      mono,
      asd,
    } = this.props;
    const { ovdpList } = mono;
    console.log(ovdpList[0].cpcode);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerPadding}>
          <FlatList
            // data={[{ name: 'Test Name', id: Date.now().toString(), description: 'Test Description', isFavorite: true }]} // items
            data={ovdpList.map(item => ({
              name: item.cpcode,
              description: item.emit_name,
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

export default connect(state => state, {})(BondList);
