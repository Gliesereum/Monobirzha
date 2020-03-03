import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Block, Text, theme } from "galio-framework";

import Switch from "../components/Switch";
import Icon from "../components/Icon";

import { monoTheme } from '../constants';
import Separator from "../components/Separator";
import {logOut} from "../state/actions/checkPhone";

class Account extends Component {
  state = {};

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={styles.settingOption1}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              value={this.state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.id)}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text style={styles.settingOption2}>{item.title}</Text>
                <Icon
                  name="minimal-right2x"
                  family="NowExtra"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  render() {

    const recommended = [
      { title: "Использовать FaceID", id: "face", type: "switch" },
      { title: "Автоблокировка", id: "autolock", type: "switch" },
      //{ title: "Notifications", id: "NotificationsSettings", type: "button" }
    ];

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
        <Block center style={styles.title}>
          <Text style={styles.titleText}>
            Счет отсутвует
          </Text>
          <Text style={styles.subtitleText}>
            Откройте брокерский счет в один клик
          </Text>
        </Block>

        <Separator/>

        <View style={{flex: 1, marginTop: 0}}>
          <Block center style={styles.title}>
            <Text style={styles.titleText}>
              Открыть счет через
            </Text>
            <View style={{width: 1, height: 60, backgroundColor: '#ccc', marginTop: 30}}/>
            <TouchableOpacity>
              <View style={{marginTop: 40}}>
                <Image
                  source={require('../assets/bankIdMini.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={{width: 1, height: 60, backgroundColor: '#ccc', marginTop: 30}}/>
            <Text style={{
              padding: 10,
              marginTop: 40,
              textAlign: 'center',
              fontSize: 14,
              color: monoTheme.COLORS.TIME,
              lineHeight: 17
            }}>
              BankID позволит Вам открыть брокерский счет быстро и безопасно, просто выберете банк в котором Вы обслуживаетесь и разрешите передать данные Украинской Бирже.
            </Text>
            <TouchableOpacity onPress={e => this.props.logOut()}>
              <View style={{marginTop: 0}}>
                <Text style={{
                  padding: 10,
                  marginTop: 40,
                  textAlign: 'center',
                  fontSize: 20,
                  color: monoTheme.COLORS.MONO,
                  lineHeight: 17
                }}>
                  Выйти из приложения
                </Text>
              </View>
            </TouchableOpacity>
          </Block>
        </View>


        {/*<FlatList
          data={recommended}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <Block center style={styles.title}>
              <Text style={styles.titleText}>
                Рекомендуемые настройки
              </Text>
              <Text style={styles.subtitleText}>
                Мы рекомендуем повысить уровень безопасности
              </Text>
            </Block>
          }
        />

        <Separator/>*/}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  settings: {
    marginTop: 60,
    paddingVertical: theme.SIZES.BASE / 3,
    backgroundColor: monoTheme.COLORS.WHITE
  },
  title: {
    paddingTop: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE
  },
  titleText: {
    paddingBottom: 5,
    fontSize: monoTheme.SIZES.FONT,
    fontWeight: '700',
    color: monoTheme.COLORS.HEADER,
    lineHeight: 20
  },
  subtitleText: {
    fontSize: 14,
    color: monoTheme.COLORS.TIME,
    lineHeight: 17
  },
  settingOption1: {
    fontSize: 16,
    color: monoTheme.COLORS.HEADER
  },
  settingOption2: {
    fontSize: 18,
    color: monoTheme.COLORS.HEADER,
    lineHeight: 20
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2
  }
});

export default connect(state => state, {logOut})(Account);
