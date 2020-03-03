import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import InfoField from '../components/InfoField';
import TitleField from '../components/TitleField';
import monobirzhaTheme from '../constants/Theme';
import { FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function BondSingle({ route, navigation, onBuy, onSell }) {
  const singleBond = route.params.singleBond;

  const handleBuyBond = () => {
    onBuy();
  };

  const handleSellBond = () => {
    onSell();
  };

  return (
    <View style={styles.container}>
      <TitleField
        title={singleBond ? singleBond.title : 'Title'}
        subTitle={singleBond ? singleBond.subTitle : 'SubTitle'}
        closeIcon={<FontAwesome
          style={{ alignSelf:'center' }}
          name="close"
          size={24}
          color={monobirzhaTheme.COLORS.PRIMARY}
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
        <TouchableOpacity onPress={handleBuyBond}>
          <View style={{ ...styles.buttonBox, backgroundColor: monobirzhaTheme.COLORS.MONO }}>
            <Text style={styles.buttonText}>Купити</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSellBond}>
          <View style={styles.buttonBox}>
            <Text style={styles.buttonText}>Продати</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: monobirzhaTheme.SIZES.BASE * 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: monobirzhaTheme.COLORS.SECONDARY,
    flex: 1,
  },
  infoContainer: {
    width: width - monobirzhaTheme.SIZES.BASE * 2,
    maxHeight: height * 0.5
  },
  costWrapper: {
    marginTop: monobirzhaTheme.SIZES.BASE,
    width: width - monobirzhaTheme.SIZES.BASE * 2,
    height: monobirzhaTheme.SIZES.BASE * 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: monobirzhaTheme.SIZES.BASE,
    marginBottom: monobirzhaTheme.SIZES.BASE * 3,
    width: width - monobirzhaTheme.SIZES.BASE * 2,
  },
  buttonBox: {
    alignItems: 'center',
    width: (width - monobirzhaTheme.SIZES.BASE * 3) / 2,
    justifyContent: 'center',
    height: 48,
    borderRadius: 5,
    backgroundColor: monobirzhaTheme.COLORS.ACTIVE,
  },
  buttonText: {
    fontSize: monobirzhaTheme.SIZES.BUTTON,
    color: monobirzhaTheme.COLORS.PRIMARY,
  }
});
