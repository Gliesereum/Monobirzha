import React, { Fragment } from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import Portfolio from '../screens/Portfolio';
import Account from '../screens/Account';
import BondList from '../screens/BondList';
import BondSingle from '../screens/BondSingle';
import BondAction from '../screens/BondAction';
import SignIn from '../screens/SignIn';
import OrderListFull from '../screens/OrderListFull';
import OrderListSuccess from '../screens/OrderListSuccess';
import OrderListPending from '../screens/OrderListPending';
import OrderListCanceled from '../screens/OrderListCanceled';

import BrokerActiveBadge from '../components/Badge';
import TopBar from '../components/OrderTopTabNavigator';

import monoTheme from '../constants/Theme';
import { ORDER_STATUS } from '../constants';

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

const OrderTabStack = createMaterialTopTabNavigator();

function OrderTabsScreen() {
  return (
    <Fragment>
      <OrderTabStack.Navigator
        initialRouteName={ORDER_STATUS.all}
        backBehavior="history"
        tabBar={props => <TopBar {...props}/>}
      >
        <OrderTabStack.Screen
          name={ORDER_STATUS.all}
          component={OrderListFull}
        />
        <OrderTabStack.Screen
          name={ORDER_STATUS.success}
          component={OrderListSuccess}
        />
        <OrderTabStack.Screen
          name={ORDER_STATUS.pending}
          component={OrderListPending}
        />
        <OrderTabStack.Screen
          name={ORDER_STATUS.canceled}
          component={OrderListCanceled}
        />
      </OrderTabStack.Navigator>
    </Fragment>
  )
}

const TabsStack = createBottomTabNavigator();

function TabsStackScreen() {
  return (
    <TabsStack.Navigator
      initialRouteName={BOTTOM_TABS.ACCOUNT_TAB}
      backBehavior="history"
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        style: {
          borderTopWidth: 0,
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
        component={OrderTabsScreen}
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
              <BrokerActiveBadge />
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

function AppContainer({isLoggedIn}) {
  return (
    <NavigationContainer theme={{colors: {background: 'rgb(0, 0, 0)'}}}>
      {isLoggedIn ? (
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Tabs" component={TabsStackScreen} />
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
