import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import List from '../components/List';

import { getPendingOrdersList } from '../state/actions/getOrderList';

class OrderListSuccess extends Component {
  componentDidMount() {
    const { getPendingOrdersList } = this.props;

    getPendingOrdersList();
  }

  render() {
    const { mono, getPendingOrdersList } = this.props;
    const { list, loading } = mono.orders.pendingList;

    return (
      <View style={styles.container}>
        <ScreenTitle title="Заявки в очікуванні" />
        <List list={list} loading={loading} getListAction={getPendingOrdersList} />
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
  getPendingOrdersList,
})(OrderListSuccess);
