import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { Block, Text, theme } from 'galio-framework';

import Switch from '../components/Switch';
import Icon from '../components/Icon';

import { monoTheme } from '../constants';
import Separator from '../components/Separator';
import { logOut } from '../state/actions/checkPhone';
import { getBrokerAccInfo, requestBrokerAccount } from '../state/actions/broker';

class Account extends Component {

  state = {};

  componentDidMount() {
    this.props.getBrokerAccInfo()
  }

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  render() {
    const {brokerAccount, brokerId, requestLoading} = this.props.mono.auth;
    const { navigate } = this.props.navigation;

    const recommended = [
      { title: "Пароль", id: "PinNotificationsSettings", type: "switch" },
      { title: "Використовувати FaceID", id: "face", type: "switch" },
      { title: "Автоблокування", id: "autolock", type: "switch" },
      { title: "Повідомлення", id: "NotificationsSettings", type: "switch" }
    ];

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
        colors={[monoTheme.COLORS.ACTIVE]}
        progressBackgroundColor={monoTheme.COLORS.SECONDARY}
        tintColor={monoTheme.COLORS.ACTIVE}
        refreshControl={
          <RefreshControl
            refreshing={requestLoading}
            colors={[monoTheme.COLORS.ACTIVE]}
            progressBackgroundColor={monoTheme.COLORS.SECONDARY}
            tintColor={monoTheme.COLORS.ACTIVE}
            onRefresh={e => this.props.getBrokerAccInfo()}
          />
        }
      >
        <Separator/>
        <Block center style={styles.title}>
          <Text style={styles.titleText}>
            {brokerId? 'Номер рахунку': 'Рахунок відсутній'}
          </Text>
          {brokerId ? (
            <Fragment>
              <Text style={{
                fontSize: 32,
                color: monoTheme.COLORS.ACTIVE,
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                {brokerId}
              </Text>
              <Text style={styles.subtitleText}>
                Рахунок виданий брокером для початку торгів
              </Text>
            </Fragment>
          ): (
            <Text style={styles.subtitleText}>
              Відкрийте брокерський рахунок в один клік
            </Text>
          )}
        </Block>

        <Separator/>

        {brokerId && (
          <Block center style={styles.title}>
            <Text style={styles.titleText}>
              Баланс рахунку
            </Text>
            <Text style={{
              fontSize: 32,
              color: monoTheme.COLORS.ACTIVE,
              fontWeight: '700',
              textTransform: 'uppercase'
            }}>
              {brokerAccount}
              <Text style={{
                color: '#ccc',
                textTransform: 'lowercase',
                fontWeight: '400',
            }}>
                грн
              </Text>
            </Text>
            <Text style={styles.subtitleText}>
              Це не справжні гроші, це демо рахунок
            </Text>
          </Block>
        )}


        {!brokerId && (
          <Fragment>
            {/*<Separator/>*/}

            <View style={{flex: 1, marginTop: 0}}>
              <Block center style={styles.title}>
                <Text style={styles.titleText}>
                  Відкрити рахунок через
                </Text>
                <View style={{width: 1, height: 30, backgroundColor: '#ccc', marginTop: 30}}/>
                <TouchableOpacity onPress={() => this.props.requestBrokerAccount()}>
                  <View style={{
                    width: 120,
                    height: 50,
                    marginTop: 30,
                    backgroundColor: '#393939',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderRadius: 40,
                  }}>
                    <Image
                      source={require('../assets/bankIdMini.png')}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{width: 1, height: 30, backgroundColor: '#ccc', marginTop: 30}}/>

                <Text style={{
                  padding: 10,
                  marginTop: 40,
                  textAlign: 'center',
                  fontSize: 14,
                  color: monoTheme.COLORS.TIME,
                  lineHeight: 17
                }}>
                  BankID дозволить Вам відкрити брокерський рахунок швидко і безпечно, просто виберете банк в якому Ви обслуговуєтеся і дозвольте передати дані Української Біржі.
                </Text>
              </Block>
            </View>
          </Fragment>
        )}

        <Separator/>

        <View style={{marginBottom: 60}}>
          <Block center style={styles.title}>
            <Text style={styles.titleText}>
              Рекомендовані налаштування
            </Text>
            <Text style={styles.subtitleText}>
              Ми рекомендуємо підвищити рівень безпеки
            </Text>
          </Block>
          {
            recommended.map((item) => {
              switch (item.type) {
                case "switch":
                  return (
                    <Block key={item.id} row middle space="between" style={styles.rows}>
                      <Text style={styles.settingOption1}>{item.title}</Text>
                      <Switch
                        onValueChange={() => this.toggleSwitch(item.id)}
                        value={this.state[item.id]}
                      />
                    </Block>
                  );
                case "button":
                  return (
                    <Block key={item.id} style={styles.rows}>
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
            })
          }
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
                Вийти
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    paddingVertical: theme.SIZES.BASE / 3,
    backgroundColor: monoTheme.COLORS.WHITE
  },
  title: {
    paddingTop: theme.SIZES.BASE,
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

export default connect(state => state, {
  logOut,
  requestBrokerAccount,
  getBrokerAccInfo
})(Account);
