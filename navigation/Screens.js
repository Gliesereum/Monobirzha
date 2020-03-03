import React from 'react';

import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Portfolio from '../screens/Portfolio';
import Account from '../screens/Account';
import BondList from '../screens/BondList';
import SignIn from '../screens/SignIn';

import monoTheme from '../constants/Theme';

const BOTTOM_TABS = {
  LIST_TAB: 'LIST_TAB',
  PORTFOLIO_TAB: 'PORTFOLIO_TAB',
  ACCOUNT_TAB: 'ACCOUNT_TAB',
};

const SIGN_IN_NAMES = {
  SIGN_IN: 'Sign In',
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = (
  <BottomTab.Navigator
    initialRouteName={BOTTOM_TABS.LIST_TAB}
    backBehavior="history"
    tabBarOptions={{
      labelStyle: {
        fontSize: 12,
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: monoTheme.COLORS.SECONDARY,
      },
      activeTintColor: monoTheme.COLORS.ACTIVE
    }}
  >
    <BottomTab.Screen
      name={BOTTOM_TABS.LIST_TAB}
      component={BondList}
      options={{
        tabBarLabel: () => {},
        tabBarIcon: ({ focused }) =>
          <View style={{ marginTop: 20 }}>
            <FontAwesome
              style={{ alignSelf:'center' }}
              name="list"
              size={18}
              color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
            />
          </View>
      }}
    />
    <BottomTab.Screen
      name={BOTTOM_TABS.PORTFOLIO_TAB}
      component={Portfolio}
      options={{
        tabBarLabel: () => {},
        tabBarIcon: ({ focused }) =>
          <View style={{ marginTop: 20 }}>
            <FontAwesome
              style={{ alignSelf:'center' }}
              name="briefcase"
              size={18}
              color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
            />
          </View>
      }}
    />
    <BottomTab.Screen
      name={BOTTOM_TABS.ACCOUNT_TAB}
      component={Account}
      options={{
        tabBarLabel: () => {},
        tabBarIcon: ({ focused }) =>
          <View style={{ marginTop: 20 }}>
            <FontAwesome
              style={{ alignSelf:'center' }}
              name="credit-card-alt"
              size={18}
              color={monoTheme.COLORS[focused ? 'ACTIVE' : 'PRIMARY']}
            />
          </View>
      }}
    />
  </BottomTab.Navigator>
);

const SignInStack = createStackNavigator();

const SignInNavigation = (
  <SignInStack.Navigator headerMode={'none'}>
    <SignInStack.Screen
      name={SIGN_IN_NAMES.SIGN_IN}
      component={SignIn}
    />
  </SignInStack.Navigator>
);

const AppContainer = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? BottomTabNavigation : SignInNavigation}
    </NavigationContainer>
  );
};

export default AppContainer;
