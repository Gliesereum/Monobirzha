import React from 'react';
import {Provider} from 'react-redux';
import { GalioProvider } from 'galio-framework';
import {createReduxStore} from './sdk/mono';
import reducers from './state';
import Delegate from "./Delegate";
const store = createReduxStore(reducers);

import AppContainer from './navigation/Screens';
import { monobirzhaTheme } from './constants'

function App() {
  return (
    <GalioProvider theme={monobirzhaTheme}>
      <Provider store={store}>
        <AppContainer isLoggedIn={true} />
      </Provider>
    </GalioProvider>
  );
}

export default App

