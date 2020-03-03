import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import monoTheme from '../constants/Theme';
import { FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

class BondSingle extends Component {
  handleBuyBond = () => {
    this.props.onBuy();
  };

  handleSellBond = () => {
    this.props.onSell();
  };
  render() {
    const { mono, navigation } = this.props;
    const { singleBond } = mono;
    return (
      <View style={styles.container}>
        <TitleField
          title={singleBond ? singleBond.title : 'Title'}
          subTitle={singleBond ? singleBond.subTitle : 'SubTitle'}
          closeIcon={<FontAwesome
            style={{ alignSelf:'center' }}
            name="close"
            size={24}
            color={monoTheme.COLORS.PRIMARY}
            onPress={() =>  navigation.goBack()}
          />}
        />
        <ScrollView style={styles.infoContainer}>
          <InfoField
            value={1015}
            label="Ціна купівлі, грн"
          />
          <InfoField
            value={995}
            label="Ціна продажу, грн"
          />
          <InfoField
            value={1000}
            label="Номінал, грн"
          />
          <InfoField
            value={"16.05.2017"}
            label="Дата розміщення, грн"
          />
          <InfoField
            value={"13.05.2020"}
            label="Дата погашення, грн"
          />
          <InfoField
            value={10}
            label="Купон, годові, %"
          />
          <InfoField
            value={34}
            label="НКД, грн"
          />
          <InfoField
            value={"16.05.2018"}
            label="Дата наступної виплати"
          />
        </ScrollView>
        <View style={styles.costWrapper}>
          <InfoField
            value={"16.05.2018"}
            label="Вільний залишок, грн"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={this.handleBuyBond}>
            <View style={{ ...styles.buttonBox, backgroundColor: monoTheme.COLORS.MONO }}>
              <Text style={styles.buttonText}>Купити</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleSellBond}>
            <View style={styles.buttonBox}>
              <Text style={styles.buttonText}>Продати</Text>
            </View>
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
  infoContainer: {
    width: width - monoTheme.SIZES.BASE * 2,
    maxHeight: height * 0.5
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
    backgroundColor: monoTheme.COLORS.ACTIVE,
  },
  buttonText: {
    fontSize: monoTheme.SIZES.BUTTON,
    color: monoTheme.COLORS.PRIMARY,
  }
});

export default connect(state => state, {})(BondSingle);
