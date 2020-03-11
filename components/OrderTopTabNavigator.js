import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';

import { ICON_STATUS } from '../constants';
import monoTheme from '../constants/Theme';

function TopBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {
        state.routes.map((route, index) => {
          const { index: stateIndex } = state;
          const isFocused = stateIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let optsStyles = {};
          switch (index) {
            case 0:
              optsStyles = {
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderLeftWidth: 2,
              };
              break;
            case 3:
              optsStyles = {
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                borderRightWidth: 2,
              };
              break;
            default:
              optsStyles = {
                borderRadius: 0,
              }
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              onPress={onPress}
              style={{
                ...styles.tab,
                ...optsStyles,
                backgroundColor: monoTheme.COLORS[isFocused ? 'ACTIVE' : 'SECONDARY']
              }}
            >
              <Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Entypo
                  style={{ alignSelf: 'center' }}
                  name={ICON_STATUS[route.name]}
                  size={18}
                  color={monoTheme.COLORS[isFocused ? 'PRIMARY' : 'MONO']}
                />
              </Animated.View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: monoTheme.SIZES.BASE * 3,
    paddingBottom: monoTheme.SIZES.BASE,
    paddingHorizontal: monoTheme.SIZES.BASE,
  },
  tab: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: monoTheme.COLORS.ACTIVE,
    padding: monoTheme.SIZES.BASE / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  tabText: {
    color: monoTheme.COLORS.PRIMARY,
    fontSize: monoTheme.SIZES.TITLE,
  },
});

export default TopBar;
