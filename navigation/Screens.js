import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Portfolio from '../screens/Portfolio';
import Account from '../screens/Account';
import BondList from '../screens/BondList';
import SignIn from '../screens/SignIn';

const BOTTOM_TABS = {
  LIST_TAB: 'LIST_TAB',
  PORTFOLIO_TAB: 'PORTFOLIO_TAB',
  ACCOUNT_TAB: 'ACCOUNT_TAB',
};

const SIGN_IN_NAMES = {
  SIGN_IN: 'Sign In',
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = <BottomTab.Navigator
    initialRouteName={BOTTOM_TABS.LIST_TAB}
    backBehavior="history"
    tabBarOptions={{
      activeTintColor: '#3ECD9A',
    }}
  >
    <BottomTab.Screen
      name={BOTTOM_TABS.LIST_TAB}
      component={BondList}
      options={{
        tabBarLabel: 'Список',
      }}
    />
    <BottomTab.Screen
      name={BOTTOM_TABS.PORTFOLIO_TAB}
      component={Portfolio}
      options={{
        tabBarLabel: 'Портфель',
      }}
    />
    <BottomTab.Screen
      name={BOTTOM_TABS.ACCOUNT_TAB}
      component={Account}
      options={{
        tabBarLabel: 'Рахунок',
      }}
    />
  </BottomTab.Navigator>;

const SignInStack = createStackNavigator();

const SignInNavigation = <SignInStack.Navigator>
    <SignInStack.Screen name={SIGN_IN_NAMES.SIGN_IN} component={SignIn} />
  </SignInStack.Navigator>;

const AppContainer = ({ isLoggedIn }) => {
  return <NavigationContainer>
      {isLoggedIn ? BottomTabNavigation : SignInNavigation}
    </NavigationContainer>;
};

export default AppContainer;
