import React, { Component, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux';
import PhoneInput from 'react-native-phone-input';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { checkPhone, resetStatePhone, verifyCode } from '../state/actions/checkPhone';
import Loading from '../patch/Loading';
import { monoTheme } from '../constants';

class SignIn extends Component {

  state = {
    phone: undefined,
    code: undefined,
    phoneValid: false,
    codeValid: false,
    modalVisible: false,
    modalMessage: 'Что то пошло не так!'
  };

  _validPhone = e => {
    const phoneRe = new RegExp("^\\++?\\d{12}$");
    this.setState({
      phoneValid: phoneRe.test(e)
    });
    if (phoneRe) this.setState({ phone: e })
  };

  render() {
    const {auth} = this.props.mono;
    //console.log(auth);
    return(
      <View style={{flex:1, backgroundColor: '#000'}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1}}
        >
          <View style={styles.root}>

            {auth.loading ? (
              <Loading
                color={'#3ECD9A'}
                size={'small'}
              />
            ) : (
              <Fragment>
                <View style={{
                  marginTop: 10,
                  height: Dimensions.get('window').height / 4
                }}>
                  <Brand
                    leftText={'mono'}
                    rightText={'birzha'}
                  />
                </View>
                {!auth.phoneRequest ? (
                  <View style={{flex: 3, padding: 10}}>
                    <PhoneInput
                      initialCountry={'ua'}
                      onChangePhoneNumber={e => this._validPhone(e)}
                      autoFormat={true}
                      allowZeroAfterCountryCode={false}
                      textProps={{
                        //TODO Init +380
                        placeholder: '+3805000001234',
                        placeholderTextColor: '#69758e'
                      }}
                      text={{color: "#fff"}}
                      style={{
                        paddingLeft: 60,
                        height:70,
                        marginTop: 0,
                        backgroundColor: "#0C0C0C",
                        borderRadius: 8,
                      }}
                      textStyle={{
                        fontSize: 18,
                        color: "#fff",
                        padding: 0
                      }}
                      ref={ref => {
                        this.phone = ref;
                      }}/>
                    <TouchableOpacity
                      onPress={
                        e => this.state.phoneValid
                          ? this.props.checkPhone(this.state.phone)
                          : e
                      }
                      activeOpacity={this.state.phoneValid ? 0.5 : 1}
                    >
                      <View style={{
                        borderRadius: 8,
                        marginTop: 40,
                        height: 65,
                        backgroundColor: this.state.phoneValid ? "#23D29C" : "#0C0C0C",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}>
                        <Text style={{
                          color: this.state.phoneValid ? monoTheme.COLORS.PRIMARY : "#69758e",
                          fontSize: 18
                        }}>
                          Надіслати код
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={{
                      padding: 20,
                      marginTop: 0,
                      textAlign: 'center',
                      fontSize: 16,
                      color: monoTheme.COLORS.TIME,
                      lineHeight: 17
                    }}>
                      Додаток для купівлі та продажу ОВПД і цінних паперів в Україні.
                    </Text>

                    <Text style={{
                      padding: 0,
                      marginTop: 0,
                      textAlign: 'center',
                      fontSize: 12,
                      color: monoTheme.COLORS.TIME,
                    }}>
                      Prototype version 0.16
                    </Text>

                    <Text style={{
                      padding: 20,
                      marginTop: 0,
                      textAlign: 'center',
                      fontSize: 12,
                      color: monoTheme.COLORS.MONO,
                    }}>
                      Створено за 48 годин в #HACKATHONHUB
                    </Text>
                  </View>
                ) : (
                  <View style={{
                    flex: 3,
                    padding: 10
                  }}>
                    <CodeInput
                      containerStyle={{
                        marginBottom: 60
                      }}
                      ref="codeInputRef"
                      keyboardType="numeric"
                      codeLength={6}
                      activeColor={"#23D29C"}
                      ignoreCase={true}
                      className='border-circle'
                      secureTextEntry={true}
                      autoFocus={true}
                      size={44}
                      codeInputStyle={{
                        fontWeight: '700',
                        fontSize: 20,
                        borderWidth: 2,
                        height:60
                      }}
                      onFulfill={(code) => this._validCode(code)}
                    />
                    <TouchableOpacity
                      style={{height:60}}
                      onPress={
                        e => this.state.codeValid
                          ? this.props.verifyCode(this.state.phone, this.state.code)
                          : e
                      }
                    >
                      <View style={{
                        width: Dimensions.get('window').width,
                        height: 60,
                        backgroundColor: this.state.codeValid ? "#23D29C" : "#2b313f",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}>
                        <Text style={{
                          color: this.state.codeValid ? monoTheme.COLORS.PRIMARY : "#69758e",
                          fontSize: 20
                        }}>
                          Увійти
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 20}}>
                      <Text
                        style={{color: "#69758e", textAlign: "right", marginBottom: 20}}
                        onPress={e => this._resetState()}
                      >
                        Не прийшла смс
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Fragment>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }

  _resetState(){
    this.props.resetStatePhone();
    this.setState({
      phone: null,
      phoneValid: false,
    });
  }

  _validCode = e => {
    if (e.length === 6) {
      this.setState({
        code: e,
        codeValid: true,
      })
    } else {
      this.setState({
        code: undefined,
        codeValid: false,
      })
    }
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: monoTheme.COLORS.SECONDARY,
  },
  containerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 8,
    borderRightColor: monoTheme.COLORS.MONO,
    marginRight: 8,
  },
  mono: {
    fontSize: 24,
    fontWeight: 'bold',
    color: monoTheme.COLORS.PRIMARY,
    marginRight: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: monoTheme.COLORS.ACTIVE,
  },
  desc: {
    fontSize: 14,
    marginTop: 16,
    color: monoTheme.COLORS.PRIMARY,
  },
});

const Brand = ({leftText, rightText}) => (
  <View style={styles.container}>
    <View style={styles.containerBrand}>
      <View style={styles.border}>
        <Text style={styles.mono}>
          {leftText}
        </Text>
      </View>
      <View>
        <Text style={styles.logo}>
          {rightText}
        </Text>
      </View>
    </View>
    <View>
      <Text style={styles.desc}>
        Українська Біржа
      </Text>
    </View>
  </View>
);

export default connect(state => state, {
  checkPhone,
  resetStatePhone,
  verifyCode
})(SignIn)
