import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import ScreenTitle from '../components/ScreenTitle';
import List from '../components/List';

import { getCanceledOrdersList } from '../state/actions/getOrderList';

class OrderListCanceled extends Component {
  componentDidMount() {
    const { getCanceledOrdersList } = this.props;

    getCanceledOrdersList();
  }

  render() {
    const { mono, getCanceledOrdersList } = this.props;
    const { list, loading } = mono.orders.canceledList;

    return (
      <View style={styles.container}>
        <ScreenTitle title="Відхилені заявки" />
        <List list={list} loading={loading} getListAction={getCanceledOrdersList} />
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
  getCanceledOrdersList,
})(OrderListCanceled);
