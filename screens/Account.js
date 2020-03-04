import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import { Block, Text, theme } from "galio-framework";

import Switch from "../components/Switch";
import Icon from "../components/Icon";

import { monoTheme } from '../constants';
import Separator from "../components/Separator";
import {logOut} from "../state/actions/checkPhone";
import {requestBrokerAccount} from "../state/actions/broker";
import Loading from "../patch/Loading";

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
      { title: "Пароль", id: "PinNotificationsSettings", type: "switch" },
      { title: "Використовувати FaceID", id: "face", type: "switch" },
      { title: "Автоблокування", id: "autolock", type: "switch" },
      { title: "Повідомлення", id: "NotificationsSettings", type: "switch" }
    ];

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >

        {this.props.mono.auth.requestLoading ? (
          <Loading color={'#23D29C'} size={'small'}/>
        ): (
          <Fragment>
            <Separator/>
            <Block center style={styles.title}>
              <Text style={styles.titleText}>
                {this.props.mono.auth.brokerId? 'Рахунок': 'Рахунок відсутній'}
              </Text>
              {this.props.mono.auth.brokerId ? (
                <Text style={{
                  fontSize: 32,
                  color: '#3ECD9A',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  {this.props.mono.auth.brokerId}
                </Text>
              ): (
                <Text style={styles.subtitleText}>
                  Відкрийте брокерський рахунок в один клік
                </Text>
              )}
            </Block>

            {!this.props.mono.auth.brokerId && (
              <Fragment>
                <Separator/>

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
              <FlatList
                data={recommended}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}
                ListHeaderComponent={
                  <Block center style={styles.title}>
                    <Text style={styles.titleText}>
                      Рекомендовані настройки
                    </Text>
                    <Text style={styles.subtitleText}>
                      Ми рекомендуємо підвищити рівень безпеки
                    </Text>
                  </Block>
                }
              />
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

          </Fragment>
        )}

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

export default connect(state => state, {logOut, requestBrokerAccount})(Account);
