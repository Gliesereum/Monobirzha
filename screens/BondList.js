import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, View } from 'react-native';

import ListItem from '../components/ListItem';

import { monoTheme } from '../constants';

const { width } = Dimensions.get('window');

export default function BondList({
  items = [],
  onPressItem = () => {},
  onElectItem = () => {},
  navigation,
  singleBond,
}) {
  const handlePressItem = () => {
    onPressItem();
    navigation.navigate('BondModal', { singleBond });
  };

  const handleElectItem = () => {
    onElectItem();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerPadding}>
        <FlatList
          data={[{ name: 'Test Name', id: Date.now().toString(), description: 'Test Description', isFavorite: true }]} // items
          renderItem={({ item }) => ListItem({
            item,
            onPressItem: handlePressItem,
            onElectItem: handleElectItem,
          })}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
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
