import React from 'react';
import {Provider} from 'react-redux';
import {createReduxStore} from './sdk/mono';
import reducers from './state';
import Delegate from "./Delegate";
const store = createReduxStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Delegate/>
    </Provider>
  );
}

export default App

