import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { monoTheme } from '../constants';

const { height, width } = Dimensions.get('window');

class OrderList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={{ ...styles.tab, marginRight: monoTheme.SIZES.BASE / 2 }}>
            <Text style={styles.tabText}>Активні</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.tab, marginRight: monoTheme.SIZES.BASE / 2 }}>
            <Text style={styles.tabText}>Виконані</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.tab, marginRight: 0 }}>
            <Text style={styles.tabText}>Відхилені</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollingContainer}
          refreshControl={
            <RefreshControl onRefresh={() => console.log('refresh')} />
          }
        >
          <Text>Inside</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: monoTheme.SIZES.BASE * 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    // backgroundColor: 'green',
  },
  scrollingContainer: {
    maxHeight: (height - (monoTheme.SIZES.BASE * 3)) * 0.8,
    width: width - (monoTheme.SIZES.BASE * 2),
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    width: width - (monoTheme.SIZES.BASE * 2),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  tab: {
    borderWidth: 1,
    borderColor: monoTheme.COLORS.ACTIVE,
    borderRadius: 5,
    padding: monoTheme.SIZES.BASE / 2,
  },
  tabText: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: 16,
  }
});

export default connect(state => state, {})(OrderList);
