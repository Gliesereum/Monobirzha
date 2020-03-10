import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import Loading from '../patch/Loading';

import monoTheme from '../constants/Theme';
import { createOrder } from '../state/actions/createOrder';

const { height, width } = Dimensions.get('window');

function AlertOnPress({ isSellMode, isError, numberOfBonds, priceOfBond, sumPrice, navigation }) {
  if (!isError) {
    Alert.alert(
      'Вітаємо',
      `
      Ви ${isSellMode ? 'продали' : 'купили'} ${numberOfBonds} облігацій за ціною ${priceOfBond} грн\n
      Сума: ${sumPrice} грн
      `,
      [
        {
          text: 'Повернутись до списку',
          onPress: () => navigation.navigate('LIST_TAB'),
        },
        {
          text: 'Заявки',
          onPress: () => navigation.navigate('PORTFOLIO_TAB'),
        },
      ],
    );
  } else {
    Alert.alert(
      'Помилка',
      'Щось пішло не так',
      [
        {
          text: 'Повернутись до списку',
          onPress: () => navigation.navigate('LIST_TAB'),
        },
        {
          text: 'Спробувати ще раз',
          style: 'cancel',
        },
      ],
    );
  }
}

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
    const { mono, navigation, createOrder } = this.props;
    const { actionError, bond } = mono.single;

    await createOrder({
      cpcode: bond.cpcode,
      flag: 'sell',
      count: numberOfBonds,
      price: priceOfBond,
    });
    AlertOnPress({ isError: actionError, isSellMode: true, numberOfBonds, priceOfBond, sumPrice, navigation });
  };

  handleBuyBond = async () => {
    const { numberOfBonds, priceOfBond, sumPrice } = this.state;
    const { mono, navigation, createOrder } = this.props;
    const { actionError, bond } = mono.single;

    await createOrder({
      cpcode: bond.cpcode,
      flag: 'buy',
      count: numberOfBonds,
      price: priceOfBond,
    });
    AlertOnPress({ isError: actionError, isSellMode: false, numberOfBonds, priceOfBond, sumPrice, navigation });
  };

  render() {
    const { mono, navigation, route } = this.props;
    const { bond, loading } = mono.single;
    const { numberOfBonds, priceOfBond, sumPrice } = this.state;
    const { isSellMode } = route.params;
    const isDisabled = (!isSellMode && mono.auth.brokerAccount < sumPrice) || !sumPrice;

    if (!priceOfBond && bond) {
      this.handleChangePriceOfBond(isSellMode ? bond.nominal * 0.985 : bond.nominal * 1.018);
    }

    return (
      <View style={styles.container}>
        <TitleField
          title={bond.cpcode || 'Title'}
          subTitle={bond.cpdescr || null}
          backIcon={<FontAwesome
            style={{ alignSelf:'center' }}
            name="long-arrow-left"
            size={40}
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
            defaultValue={(priceOfBond && priceOfBond.toString())}
            label={isSellMode ? 'Ціна продажі' : 'Ціна торгівлі'}
            onFieldChange={this.handleChangePriceOfBond}
          />
          <InfoField
            value={sumPrice}
            label="Сума"
          />
        </ScrollView>
        <View
          style={{
            ...styles.buttonWrapper,
            backgroundColor: isDisabled ? '#0C0C0C' : monoTheme.COLORS[isSellMode ? 'MONO' : 'ACTIVE'],
          }}
        >
          <TouchableOpacity
            disabled={isDisabled}
            onPress={isSellMode ? this.handleSellBond : this.handleBuyBond}
            style={styles.touchBox}
          >
            <Text style={{ ...styles.buttonText, color: isDisabled ? '#69758e' : monoTheme.COLORS.PRIMARY }}>
              {isSellMode ? 'Продати' : 'Купити'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    height: 40,
    borderRadius: 5,
    backgroundColor: monoTheme.COLORS.MONO,
  },
  touchBox: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: monoTheme.SIZES.BUTTON,
  }
});

export default connect(state => state, {
  createOrder,
})(BondAction)
