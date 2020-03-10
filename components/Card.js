import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { monoTheme } from '../constants';
import InfoField from './InfoField';

const { width } = Dimensions.get('window');

export default function Card({ item, fields, isPortfolio, iconData, onSellAction }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>
            {item.cpcode}
          </Text>
        </View>
        {
          isPortfolio ? (
            <TouchableOpacity onPress={onSellAction && onSellAction === typeof 'function' && onSellAction}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttonText}>Продати</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                ...styles.iconBox,
                backgroundColor: iconData.backgroundColor,
              }}
            >
              <Entypo
                style={{alignSelf: 'center'}}
                name={iconData.name}
                size={monoTheme.SIZES.TITLE}
                color={monoTheme.COLORS.MONO}
              />
            </View>
          )
        }
      </View>
      <View style={styles.contentContainer}>
        {
          fields.map(({ label, value, color = monoTheme.COLORS.ACTIVE }) => (
            <InfoField
              key={label}
              value={value}
              label={label}
              valueTextStyle={{
                fontSize: monoTheme.SIZES.FONT,
                fontWeight: 'bold',
                color: color,
              }}
              labelTextStyle={{
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />
          ))
        }
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerBox}>
          <Entypo
            style={{alignSelf: 'center'}}
            name="price-tag"
            size={monoTheme.SIZES.TITLE}
            color={monoTheme.COLORS.MONO}
          />
          <Text style={styles.iconText}>{`${item.price} грн`}</Text>
        </View>
        <View style={styles.footerBox}>
          <Entypo
            style={{alignSelf: 'center'}}
            name="database"
            size={monoTheme.SIZES.TITLE}
            color={monoTheme.COLORS.MONO}
          />
          <Text style={styles.iconText}>{item.count}</Text>
        </View>
        <View style={styles.footerBox}>
          <Entypo
            style={{alignSelf: 'center'}}
            name="credit"
            size={monoTheme.SIZES.TITLE}
            color={monoTheme.COLORS.MONO}
          />
          <Text style={styles.iconText}>
            {`${item.count * item.price} грн`}
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: monoTheme.SIZES.BASE,
    borderWidth: 2,
    borderColor: monoTheme.COLORS.ACTIVE,
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: monoTheme.COLORS.ACTIVE,
    padding: monoTheme.SIZES.BASE / 2,
  },
  headerTitle: {

  },
  headerTitleText: {
    fontSize: monoTheme.SIZES.FONT,
    fontWeight: 'bold',
    color: monoTheme.COLORS.MONO,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: monoTheme.COLORS.MONO,
  },
  contentContainer: {
    paddingVertical: monoTheme.SIZES.BASE / 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: monoTheme.SIZES.BASE / 2,
    borderTopWidth: 2,
    borderTopColor: monoTheme.COLORS.ACTIVE,
  },
  footerBox: {
    flexDirection: 'row',
  },
  iconText: {
    marginLeft: 8,
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.FONT,
    fontWeight: 'bold',
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
  },
});
