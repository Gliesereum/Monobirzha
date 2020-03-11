import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { getPortfolioList } from '../state/actions/getPortfolioList';
import { getSingleOvdp } from '../state/actions/getOvdpDetails';
import { monoTheme } from '../constants';
import OrderCard from '../components/Card';
import ScreenTitle from '../components/ScreenTitle';
import EmptyCard from '../components/EmptyCard';
import { getNcd } from '../utils';

const { height, width } = Dimensions.get('window');

class Portfolio extends Component {
  componentDidMount() {
    this.props.getPortfolioList();
  }

  handleSellBond = (ovdp) => {
    const { navigation, getSingleOvdp } = this.props;

    getSingleOvdp({ ovdp });
    navigation.navigate('BondActionModal', { isSellMode: true });
  };

  render() {
    const { mono, getPortfolioList } = this.props;
    return (
      <View style={styles.container}>
        <ScreenTitle title="Мій портфель" />
        <ScrollView
          contentContainerStyle={styles.scrollingContainer}
          refreshControl={
            <RefreshControl
              refreshing={mono.portfolio.loading}
              colors={[monoTheme.COLORS.ACTIVE]}
              progressBackgroundColor={monoTheme.COLORS.SECONDARY}
              tintColor={monoTheme.COLORS.ACTIVE}
              onRefresh={getPortfolioList}
            />
          }
        >
          {mono.portfolio.list.length > 0 ? (
            <Fragment>
              {mono.portfolio.list.map(order => {
                return (
                  <OrderCard
                    key={order.id}
                    item={order}
                    fields={[
                      {
                        label: 'НКД',
                        value: getNcd(order.ovdp.payments),
                      },
                      {
                        label: 'Дата погашення',
                        value: order.ovdp.pgs_date,
                      },
                    ]}
                    isPortfolio={true}
                    onSellAction={() => this.handleSellBond(order.ovdp)}
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
  titleBox: {
  },
  titleText: {
    color: monoTheme.COLORS.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: 8,
    fontSize: monoTheme.SIZES.TITLE,
  },
  scrollingContainer: {
    maxHeight: (height - (monoTheme.SIZES.BASE * 3)) * 0.8,
    width: width,
    height: height,
    padding: monoTheme.SIZES.BASE,
  },
});

export default connect(state => state, {
  getPortfolioList,
  getSingleOvdp,
})(Portfolio);
