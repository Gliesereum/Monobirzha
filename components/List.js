import React, { Fragment } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { monoTheme, ORDER_DIRECTIONS, ICON_STATUS } from '../constants';
import { getDate } from '../utils';
import OrderCard from '../components/Card';
import EmptyCard from '../components/EmptyCard';

const { height, width } = Dimensions.get('window');

function List({ list, loading, getListAction }) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollingContainer}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          colors={[monoTheme.COLORS.ACTIVE]}
          progressBackgroundColor={monoTheme.COLORS.SECONDARY}
          tintColor={monoTheme.COLORS.ACTIVE}
          onRefresh={getListAction}
        />
      }
    >
      {list.length > 0 ? (
        <Fragment>
          {list.map(order => {
            return (
              <OrderCard
                key={order.id}
                item={order}
                fields={[
                  {
                    label: 'Створено',
                    value: getDate({ separator: '.', date: order.createdAt }),
                  },
                  {
                    label: 'Напрямок',
                    value: ORDER_DIRECTIONS[order.flag],
                    color: monoTheme.COLORS[order.flag === ORDER_DIRECTIONS.sell ? 'MONO' : 'ACTIVE'],
                  },
                ]}
                isPortfolio={false}
                iconData={{
                  name: ICON_STATUS[order.status],
                }}
              />
            )
          })}
        </Fragment>
      ) : (
        <EmptyCard title="Список порожній" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollingContainer: {
    maxHeight: (height - (monoTheme.SIZES.BASE * 3)) * 0.8,
    width: width,
    height: height,
    padding: monoTheme.SIZES.BASE,
  },
});

export default List;
