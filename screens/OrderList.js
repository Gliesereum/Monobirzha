import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { getOrderListAction } from '../state/actions/getOrderList';
import { monoTheme, ORDER_STATUS, ORDER_DIRECTIONS, ICON_STATUS } from '../constants';
import { getDate } from '../utils';
import OrderCard from '../components/Card';
import EmptyCard from '../components/EmptyCard';
import ScreenTitle from '../components/ScreenTitle';

const { height, width } = Dimensions.get('window');

class OrderList extends Component {
  componentDidMount() {
    this.props.getOrderListAction({});
  }

  handleFilterList = (mode) => {
      this.props.getOrderListAction({ mode });
  };

  render() {
    const { mono, getOrderListAction } = this.props;
    const { mode } = mono.orders;

    return (
      <View style={styles.container}>
        <ScreenTitle title="Мої заявки" />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={{
              ...styles.tab,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderLeftWidth: 2,
              backgroundColor: monoTheme.COLORS[mode === ORDER_STATUS.ALL ? 'ACTIVE' : 'SECONDARY'],
            }}
            onPress={() => this.handleFilterList(ORDER_STATUS.ALL)}
          >
            <Entypo
              style={{alignSelf: 'center'}}
              name="list"
              size={18}
              color={monoTheme.COLORS[mode === ORDER_STATUS.ALL ? 'PRIMARY' : 'MONO']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tab,
              backgroundColor: monoTheme.COLORS[mode === ORDER_STATUS.SUCCESS ? 'ACTIVE' : 'SECONDARY'],
            }}
            onPress={() => this.handleFilterList(ORDER_STATUS.SUCCESS)}
          >
            <Entypo
              style={{alignSelf: 'center'}}
              name="check"
              size={18}
              color={monoTheme.COLORS[mode === ORDER_STATUS.SUCCESS ? 'PRIMARY' : 'MONO']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tab,
              backgroundColor: monoTheme.COLORS[mode === ORDER_STATUS.PENDING ? 'ACTIVE' : 'SECONDARY'],
            }}
            onPress={() => this.handleFilterList(ORDER_STATUS.PENDING)}
          >
            <Entypo
              style={{alignSelf: 'center'}}
              name="hour-glass"
              size={18}
              color={monoTheme.COLORS[mode === ORDER_STATUS.PENDING ? 'PRIMARY' : 'MONO']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tab,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderRightWidth: 2,
              backgroundColor: monoTheme.COLORS[mode === ORDER_STATUS.CANCELED ? 'ACTIVE' : 'SECONDARY'],
            }}
            onPress={() => this.handleFilterList(ORDER_STATUS.CANCELED)}
          >
            <Entypo
              style={{alignSelf: 'center'}}
              name="block"
              size={18}
              color={monoTheme.COLORS[mode === ORDER_STATUS.CANCELED ? 'PRIMARY' : 'MONO']}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollingContainer}
          refreshControl={
            <RefreshControl
              refreshing={mono.orders.loading}
              colors={[monoTheme.COLORS.ACTIVE]}
              progressBackgroundColor={monoTheme.COLORS.SECONDARY}
              tintColor={monoTheme.COLORS.ACTIVE}
              onRefresh={() => getOrderListAction({ mode })}
            />
          }
        >
          {mono.orders.filteredList.length > 0 ? (
            <Fragment>
              {mono.orders.filteredList.map(order => {
                return (
                  <OrderCard
                    key={order.id}
                    item={order}
                    fields={[
                      {
                        label: 'Створено'.toUpperCase(),
                        value: getDate({ separator: '.', date: order.createdAt }),
                      },
                      {
                        label: 'Напрямок'.toUpperCase(),
                        value: ORDER_DIRECTIONS[order.flag].toUpperCase(),
                        color: monoTheme.COLORS[order.flag === ORDER_DIRECTIONS.sell ? 'MONO' : 'ACTIVE'],
                      },
                    ]}
                    isPortfolio={false}
                    iconData={{
                      backgroundColor: ICON_STATUS[order.status.toUpperCase()].color,
                      name: ICON_STATUS[order.status.toUpperCase()].icon,
                    }}
                  />
                )
              })}
            </Fragment>
          ) : (
            <EmptyCard title="Список порожній" />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: monoTheme.SIZES.BASE * 3,
    flex: 1,
    width: width,
  },
  scrollingContainer: {
    maxHeight: (height - (monoTheme.SIZES.BASE * 3)) * 0.8,
    width: width,
    height: height,
    padding: monoTheme.SIZES.BASE,
  },
  tabContainer: {
    width: width,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: monoTheme.SIZES.BASE,
  },
  tab: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: monoTheme.COLORS.ACTIVE,
    padding: monoTheme.SIZES.BASE / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.TITLE,
  },
});

export default connect(state => state, {
  getOrderListAction,
})(OrderList);
