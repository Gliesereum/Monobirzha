import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import Loading from '../patch/Loading';

import monoTheme from '../constants/Theme';
// import { onSellBond, onBuyBond } from '../state/actions/actionBond';

const { height, width } = Dimensions.get('window');

class BondAction extends Component {
  state = {
    numberOfBonds: '',
    priceOfBond: '',
    sumPrice: '',
  };

  handleChangeNumberOfBonds = (number) => {
    this.setState((prevState) => ({
      ...prevState,
      numberOfBonds: number,
      sumPrice: number * prevState.priceOfBond,
    }));
  };

  handleChangePriceOfBond = (price) => {
    this.setState((prevState) => ({
      ...prevState,
      priceOfBond: price,
      sumPrice: price * prevState.numberOfBonds,
    }));
  };

  handleSellBond = async () => {
    const { numberOfBonds, priceOfBond, sumPrice } = this.state;

    // await onSellBond();
  };

  handleBuyBond = async () => {
    const { numberOfBonds, priceOfBond, sumPrice } = this.state;

    // await onBuyBond();
  };

  render() {
    const { mono, navigation, route, onSellBond, onBuyBond } = this.props;
    const { bond, loading } = mono.single;
    const { numberOfBonds, priceOfBond, sumPrice } = this.state;
    const { isSellMode } = route.params;

    return (
      <View style={styles.container}>
        <TitleField
          title={bond.cpcode || 'Title'}
          subTitle={bond.cpdescr || null}
          backIcon={<FontAwesome
            style={{ alignSelf:'center' }}
            name="long-arrow-left"
            size={24}
            color={monoTheme.COLORS.PRIMARY}
            onPress={() => navigation.navigate('BondInfoModal')}
          />}
        />
        <ScrollView style={styles.actionContainer}>
          <InfoField
            isFieldDynamic={true}
            defaultValue={numberOfBonds}
            label="Кількість"
            onFieldChange={this.handleChangeNumberOfBonds}
          />
          <InfoField
            isFieldDynamic={true}
            defaultValue={priceOfBond}
            label={isSellMode ? 'Ціна продажі' : 'Ціна торгівлі'}
            onFieldChange={this.handleChangePriceOfBond}
          />
          <InfoField
            value={sumPrice}
            label="Сума"
          />
        </ScrollView>
        <View style={{ ...styles.buttonWrapper, backgroundColor: monoTheme.COLORS[isSellMode ? 'ACTIVE' : 'MONO'] }}>
          <TouchableOpacity onPress={isSellMode ? this.handleSellBond : this.handleBuyBond}>
            <Text style={styles.buttonText}>{isSellMode ? 'Продати' : 'Купити'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: monoTheme.SIZES.BASE * 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: monoTheme.COLORS.SECONDARY,
    flex: 1,
  },
  actionContainer: {
    maxHeight: height * 0.5,
    width: width - monoTheme.SIZES.BASE * 2,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: monoTheme.SIZES.BASE,
    marginBottom: monoTheme.SIZES.BASE * 3,
    width: width - monoTheme.SIZES.BASE * 2,
    height: 48,
    borderRadius: 5,
    backgroundColor: monoTheme.COLORS.MONO,
  },
  buttonText: {
    fontSize: monoTheme.SIZES.BUTTON,
    color: monoTheme.COLORS.PRIMARY,
  }
});

export default connect(state => state, {
  // onSellBond,
  // onBuyBond,
})(BondAction)
