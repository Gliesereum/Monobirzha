import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

function Badge({ styles, isActive }) {
  return (
    <Fragment>
      {
        isActive ? (
          <View style={{
            backgroundColor: '#CD603E',
            width: 15,
            height: 15,
            position: 'absolute',
            right: 0,
            top: -30,
            borderRadius: 15,
            ...styles,
          }}
          />
        ) : (
          null
        )
      }
    </Fragment>
  );
}

function BrokerActiveBadge(props) {
  const isActive = !(!!props.mono.auth.brokerId);
  const { styles } = props;

  return (
    <Badge isActive={isActive} styles={styles} />
  );
}

export default connect(state => state)(BrokerActiveBadge);
