import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import List from '../components/List';

import { getSuccessOrdersList } from '../state/actions/getOrderList';

class OrderListSuccess extends Component {
  componentDidMount() {
    const { getSuccessOrdersList } = this.props;

    getSuccessOrdersList();
  }

  render() {
    const { mono, getSuccessOrdersList } = this.props;
    const { list, loading } = mono.orders.successList;

    return (
      <View style={styles.container}>
        <ScreenTitle title="Успішні заявки" />
        <List list={list} loading={loading} getListAction={getSuccessOrdersList} />
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
  getSuccessOrdersList,
})(OrderListSuccess);
