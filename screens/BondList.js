import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, View } from 'react-native';
import { Text, theme } from 'galio-framework';

import ListItem from '../components/ListItem';

import { monobirzhaTheme } from '../constants';

const { width } = Dimensions.get('window');

export default function BondList({
  items = [],
  onPressItem = () => {},
  onElectItem = () => {},
  navigation,
}) {
  const handlePressItem = () => {
    onPressItem();
    navigation.navigate('BondModal');
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
    paddingTop: theme.SIZES.BASE * 2,
    flex: 1,
    width: width,
    backgroundColor: monobirzhaTheme.COLORS.SECONDARY,
  },
  innerPadding: {
    paddingHorizontal: theme.SIZES.BASE,
  },
});
