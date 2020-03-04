import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import Portfolio from '../screens/Portfolio';
import Account from '../screens/Account';
import BondList from '../screens/BondList';
import OrderList from '../screens/OrderList';
import BondSingle from '../screens/BondSingle';
import BondAction from '../screens/BondAction';
import SignIn from '../screens/SignIn';

import monoTheme from '../constants/Theme';
import BankId from "../screens/BankId";

const BOTTOM_TABS = {
  LIST_TAB: 'LIST_TAB',
  ORDERS_TAB: 'ORDERS_TAB',
  PORTFOLIO_TAB: 'PORTFOLIO_TAB',
  ACCOUNT_TAB: 'ACCOUNT_TAB',
};

const SIGN_IN_NAMES = {
  SIGN_IN: 'Sign In',
  BANK_ID: 'Bank ID'
};

const SignInStack = createStackNavigator();

function SignInNavigation() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen name={SIGN_IN_NAMES.SIGN_IN} component={SignIn} />
    </SignInStack.Navigator>
  );
}

const TabsStack = createBottomTabNavigator();

function TabsStackScreen({...props}) {
  return (
    <TabsStack.Navigator
      initialRouteName={
        BOTTOM_TABS.ACCOUNT_TAB
        //props.brokerId ? BOTTOM_TABS.LIST_TAB : BOTTOM_TABS.ACCOUNT_TAB
      }
      backBehavior="history"
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        style: {
          borderTopWidth: 0,
          //backgroundColor: monoTheme.COLORS.SECONDARY,
          backgroundColor: '#181818',
        },
        activeTintColor: monoTheme.COLORS.ACTIVE
      }}
    >
      <TabsStack.Screen
        name={BOTTOM_TABS.LIST_TAB}
        component={BondList}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{
                color: monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY'],
                fontSize: 12,
              }}>
                Ринок
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            <View style={{marginTop: 10}}>
              <Entypo
                style={{alignSelf: 'center'}}
                name="bar-graph"
                size={18}
                color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
              />
            </View>
        }}
      />
      <TabsStack.Screen
        name={BOTTOM_TABS.ORDERS_TAB}
        component={OrderList}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{
                color: monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY'],
                fontSize: 12,
              }}>
                Заявки
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            <View style={{marginTop: 10}}>
              <FontAwesome
                style={{alignSelf: 'center'}}
                name="list"
                size={18}
                color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
              />
            </View>
        }}
      />
      <TabsStack.Screen
        name={BOTTOM_TABS.PORTFOLIO_TAB}
        component={Portfolio}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{
                color: monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY'],
                fontSize: 12,
              }}>
                Портфель
              </Text>
            </View>
          ),
          tabBarIcon: ({focused}) =>
            <View style={{marginTop: 10}}>
              <Entypo
                style={{alignSelf: 'center'}}
                name="briefcase"
                size={18}
                color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
              />
            </View>
        }}
      />
      <TabsStack.Screen
        name={BOTTOM_TABS.ACCOUNT_TAB}
        component={Account}
        options={{
          tabBarLabel: ({focused}) => (
            <View>
              <Text style={{
                color: monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY'],
                fontSize: 12,
              }}>
                Рахунок
              </Text>
              {!props.brokerId && (
                <View style={{
                  backgroundColor: '#CD603E',
                  width: 15,
                  height: 15,
                  position: 'absolute',
                  right: 0,
                  top: -30,
                  borderRadius: 15
                }}/>
              )}
            </View>
          ),
          tabBarIcon: ({focused}) =>
            <View style={{marginTop: 10}}>
              <Entypo
                style={{alignSelf: 'center'}}
                name="wallet"
                size={18}
                color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
              />
            </View>
        }}
      />
    </TabsStack.Navigator>
  );
}

const RootStack = createStackNavigator();

function AppContainer({isLoggedIn, brokerId}) {
  return (
    <NavigationContainer theme={{colors: {background: 'rgb(0, 0, 0)'}}}>
      {isLoggedIn ? (
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Tabs" component={TabsStackScreen.bind(null, {brokerId})} />
          <RootStack.Screen name="BondInfoModal" component={BondSingle}/>
          <RootStack.Screen name="BondActionModal" component={BondAction}/>
        </RootStack.Navigator>
      ) : (
        <SignInNavigation />
      )}
    </NavigationContainer>
  );
}

export default AppContainer;
