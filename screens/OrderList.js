import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { getOrderListAction } from '../state/actions/getOrderList';
import { monoTheme } from '../constants';
import Loading from "../patch/Loading";

const { height, width } = Dimensions.get('window');

class OrderList extends Component {
  componentDidMount() {
    this.props.getOrderListAction()
  }

  render() {
    const { mono, getOrderListAction } = this.props;
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'transparent'}}>
          <Text style={{
            color: '#ccc',
            textAlign: 'center',
            padding: 8,
            fontSize: 24,
            borderWidth: 1,
            borderBottomColor: '#ccc'
          }}>
            Мої заявки
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollingContainer}
          refreshControl={
            <RefreshControl refreshing={mono.orders.loading} onRefresh={e => getOrderListAction()} />
          }
        >
          {mono.orders.loading ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center'
            }}>
              <Loading color={'#23D29C'} size={'small'}/>
            </View>
          ) : (
            <View style={{flex: 1, padding: 12}}>
              {mono.orders.list.map(order => {
                return (
                  <View key={order.id} style={{
                    //backgroundColor: '#282828',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderWidth: 1,
                    paddingBottom: 8
                  }}>
                    <View>
                      <Text style={{color: "#f2f2f2", fontSize: 18, marginRight: 8}}>
                        {order.cpcode}
                      </Text>
                    </View>
                    <View style={{width: 50}}>
                      <Text style={{
                        color: order.flag === 'sell' ? "red" : "green",
                        fontSize: 18,
                        fontWeight: 'bold',
                        textTransform: 'uppercase'

                      }}>
                        {order.flag}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{color: "#f2f2f2", textAlign: 'right'}}>
                        Ціна {order.price} грн
                      </Text>
                      <Text style={{color: monoTheme.COLORS.ACTIVE, textAlign: 'right'}}>
                        Статус {order.status === 'pending' ? 'В ожидании': 'Исполнен'}
                      </Text>
                      <Text style={{color: "#f2f2f2", textAlign: 'right'}}>
                        Кількість {order.count}
                      </Text>
                      <Text style={{color: "#f2f2f2", textAlign: 'right'}}>
                        Сума заявки {order.count * order.price} грн
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
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
    // backgroundColor: 'green',
  },
  scrollingContainer: {
    //maxHeight: (height - (monoTheme.SIZES.BASE * 3)) * 0.8,
    width: width,
    height: height,
    //flexGrow: 1,
    //backgroundColor: 'pink',
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

export default connect(state => state, {
  getOrderListAction,
})(OrderList);
