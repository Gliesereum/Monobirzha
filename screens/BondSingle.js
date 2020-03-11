import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import Loading from '../patch/Loading';
import monoTheme from '../constants/Theme';
import { getNcd } from '../utils';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

class BondSingle extends Component {
  handleBuyBond = () => {
    const { navigation } = this.props;

    navigation.navigate('BondActionModal', { isSellMode: false });
  };

  handleSellBond = () => {
    const { navigation } = this.props;

    navigation.navigate('BondActionModal', { isSellMode: true });
  };

  render() {
    const { mono, navigation } = this.props;
    const { bond, loading } = mono.single;

    return (
      <View style={styles.container}>
        {
          loading ? (
            <Loading
              color={monoTheme.COLORS.ACTIVE}
              size={'small'}
            />
          ) : (
            <Fragment>
              <TitleField
                title={bond.cpcode || 'Title'}
                subTitle={bond.cpdescr || null}
                closeIcon={
                  <Ionicons
                    style={{ alignSelf:'center' }}
                    name="ios-close-circle-outline"
                    size={40}
                    color={monoTheme.COLORS.MONO}
                    onPress={() => navigation.navigate('LIST_TAB')}
                  />
                }
              />
              <ScrollView style={styles.infoContainer}>
                <InfoField
                  value={bond.nominal*1.018}
                  label="Ціна купівлі, грн"
                />
                <InfoField
                  value={bond.nominal*0.985}
                  label="Ціна продажу, грн"
                />
                <InfoField
                  value={bond.nominal}
                  label="Номінал"
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
                  value={getNcd(bond.payments)}
                  label={"НКД"}
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
    width: width,
    //maxHeight: height * 0.5,
    //backgroundColor: '#131313',
    flex: 1,
  },
  costWrapper: {
    //marginTop: monoTheme.SIZES.BASE,
    width: width,
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
    height: 40,
    borderRadius: 5,
    backgroundColor: monoTheme.COLORS.MONO,
  },
  buttonText: {
    fontSize: monoTheme.SIZES.BUTTON,
    color: monoTheme.COLORS.PRIMARY,
  }
});

export default connect(state => state, {})(BondSingle);
