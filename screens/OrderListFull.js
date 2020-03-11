import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import List from '../components/List';

import { getFullOrdersList } from '../state/actions/getOrderList';

class OrderListFull extends Component {
  componentDidMount() {
    const { getFullOrdersList } = this.props;

    getFullOrdersList();
  }

  render() {
    const { mono, getFullOrdersList } = this.props;
    const { list, loading } = mono.orders.fullList;

    return (
      <View style={styles.container}>
        <ScreenTitle title="Всі заявки" />
        <List list={list} loading={loading} getListAction={getFullOrdersList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(state => state, {
  getFullOrdersList,
})(OrderListFull);
