import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import Loading from '../patch/Loading';
import monoTheme from '../constants/Theme';
import { FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

class BondSingle extends Component {
  handleBuyBond = () => {
    const { navigation } = this.props;

    navigation.navigate('BondActionModal', { isSellMode: false });
  };

  handleSellBond = () => {
    const { navigation } = this.props;

    navigation.navigate('BondActionModal', { isSellMode: true });
  };

  getNcd = (index) => {
    if (index < 0) return null;
    const { bond } = this.props.mono.single;
    const payment = bond.payments[index];
    if (payment.pay_type === 1) {
      const dateElem = payment.pay_date.split('.');
      const dateNow = new Date();
      const diffDatesInMS = dateNow - new Date(+dateElem[2], +dateElem[1] - 1, +dateElem[0]);
      const diffDatesInDays = diffDatesInMS / 1000 / 60 / 60 / 24;
      return Math.floor(diffDatesInDays);
    } else {
      this.getNcd(index - 1)
    }
  };

  render() {
    const { mono, navigation } = this.props;
    const { bond, loading } = mono.single;

    return (
      <View style={styles.container}>
        {
          loading ? (
            <Loading
              color={'#3ECD9A'}
              size={'small'}
            />
          ) : (
            <Fragment>
              <TitleField
                title={bond.cpcode || 'Title'}
                subTitle={bond.cpdescr || null}
                closeIcon={<FontAwesome
                  style={{ alignSelf:'center' }}
                  name="close"
                  size={24}
                  color={monoTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('LIST_TAB')}
                />}
              />
              <ScrollView style={styles.infoContainer}>
                <InfoField
                  value={bond.nominal*1.018 }
                  label="Ціна купівлі, грн"
                />
                <InfoField
                  value={bond.nominal*0.985}
                  label="Ціна продажу, грн"
                />
                <InfoField
                  value={bond.nominal}
                  label="Номінал, грн"
                />
                <InfoField
                  value={bond.razm_date}
                  label="Дата первинного розміщення"
                />
                <InfoField
                  value={bond.pgs_date}
                  label="Дата погашення"
                />
                <InfoField
                  value={bond.auk_proc}
                  label="Процентна ставка"
                />
                <InfoField
                  value={null}
                  label={this.getNcd(bond.payments ? bond.payments.length - 1 : -1)}
                />
                <InfoField
                  value={null}
                  label="Дата наступної виплати"
                />
              </ScrollView>
              <View style={styles.costWrapper}>
                <InfoField
                  value={mono.auth.brokerAccount}
                  label="Вільний залишок, грн"
                />
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={this.handleSellBond}>
                  <View style={styles.buttonBox}>
                    <Text style={styles.buttonText}>Продати</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleBuyBond}>
                  <View style={{ ...styles.buttonBox, backgroundColor: monoTheme.COLORS.ACTIVE }}>
                    <Text style={styles.buttonText}>Купити</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )
        }
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
  infoContainer: {
    width: width - monoTheme.SIZES.BASE * 2,
    maxHeight: height * 0.5,
    flex: 1,
  },
  costWrapper: {
    marginTop: monoTheme.SIZES.BASE,
    width: width - monoTheme.SIZES.BASE * 2,
    height: monoTheme.SIZES.BASE * 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: monoTheme.SIZES.BASE,
    marginBottom: monoTheme.SIZES.BASE * 3,
    width: width - monoTheme.SIZES.BASE * 2,
  },
  buttonBox: {
    alignItems: 'center',
    width: (width - monoTheme.SIZES.BASE * 3) / 2,
    justifyContent: 'center',
    height: 48,
    borderRadius: 5,
    backgroundColor: monoTheme.COLORS.MONO,
  },
  buttonText: {
    fontSize: monoTheme.SIZES.BUTTON,
    color: monoTheme.COLORS.PRIMARY,
  }
});

export default connect(state => state, {})(BondSingle);
