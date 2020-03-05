import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import produce from 'immer';
import {AsyncStorage} from "react-native";

class MonoSDK {

  constructor({development, server}) {

    this.config = {
      development,
      server,
    };

    this.urls = {
      STATUS_API: `${this.config.server}/api/v1/status`,
      CHECK_PHONE: `${this.config.server}/api/v1/patch/check/phone?q=`,
      VERIFY_CODE: `${this.config.server}/api/v1/patch/check/phone/verify`,
      ACCOUNT_INFO: `${this.config.server}/api/v1/patch/hacker/my`,
      REQUEST_BROKER: `${this.config.server}/api/v1/patch/broker/request/account`,
      GET_OVDP_LIST: `${this.config.server}/api/v1/patch/ovdp/list`,
      GET_OVDP_SINGLE: `${this.config.server}/api/v1/patch/ovdp/details/`,
      CREATE_ORDER: `${this.config.server}/api/v1/patch/order/create`,
      GET_ORDER_LIST: `${this.config.server}/api/v1/patch/order/list`,
    }

    this.api = {
      statusApi: async () =>
        await this._fetchServer(
          this.urls.STATUS_API,
          "get"
        ),

      getOvdpList: async () =>
        await this._fetchServer(
          this.urls.GET_OVDP_LIST,
          "get"
        ),

      getAccountInfo: async (token) =>
        await this._fetchServer(
          this.urls.ACCOUNT_INFO,
          "get",
          undefined,
          token
        ),

      getOrderList: async (token) =>
        await this._fetchServer(
          this.urls.GET_ORDER_LIST,
          "get",
          undefined,
          token
        ),

      requestBrokerAcc: async (token) =>
        await this._fetchServer(
          this.urls.REQUEST_BROKER,
          "get",
          undefined,
          token
        ),

      getOvdpDetails: async (id) =>
        await this._fetchServer(
          this.urls.GET_OVDP_SINGLE + id,
          "get"
        ),

      checkPhone: async phone =>
        await this._fetchServer(
          //this.urls.CHECK_PHONE + phone + `${development && '&dev=08a4dc90b3f58ec0.key'}`,
          this.urls.CHECK_PHONE + phone,
          "get"
        ),

      verifyCode: async (phone, code) =>
        await this._fetchServer(
          this.urls.VERIFY_CODE + `?q=${phone}&code=${code}`,
          "get"
        ),

      createOrder: async (body, token) =>
        await this._fetchServer(
          this.urls.CREATE_ORDER,
          "post",
          body,
          token,
        ),
    };

    this.storage = {
      setStorage: async (keyStore, token) => {
        try {
          await AsyncStorage.setItem(`@MonoStore:${keyStore}`, token);
        } catch (error) {
          console.log(error);
        }
      },
      getStorage: async (keyStore) => {
        try {
          const value = await AsyncStorage.getItem(`@MonoStore:${keyStore}`);
          if (value !== null) {
            return value
          }
        } catch (error) {
          console.log(error);
        }
      },
      remove: async (keyStore) => {
        try {
          await AsyncStorage.removeItem(`@MonoStore:${keyStore}`);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }


  _fetchServer(url, method = "get", body = undefined, token = undefined) {

    const Header = new Headers({
      "Content-Type": "application/json",
    });

    if (token)
      Header.set("Hackathon-Hub", `${token}`);

    const Params = {
      method: method,
      cache: 'default',
      headers: Header,
    };

    if (method === "post" || "put")
      Params.body = JSON.stringify(body);

    return new Promise((resolve, reject) => {
      fetch(`${url}`, Params)
        .then(MonoSDK._checkHttpStatus).then(data => {
        resolve(data)
      }).catch(err => {
        console.log(err);
        reject(err)
      });
    })
  }

  static _checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      if (response.status === 204) return [];
      return response.json()
    } else {
      return response.json().then(Promise.reject.bind(Promise));
    }
  }
}

export const createReduxStore = _configureStore;

export const createReducer = (cases = {}, defaultState = {}) =>
  (state = defaultState, action) => produce(state, draft => {
    if (action && action.type && cases[action.type] instanceof Function) {
      cases[action.type](draft, action.payload);
    }
  });

function SDK({server, development}) {
  if (!server) return new Error("Error...");
  return new MonoSDK({
    server, development
  })
}

function _configureStore(reducers) {
  const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  return createStore(
    combineReducers({
      ...reducers
    }),
    composeEnhancers(applyMiddleware(ReduxPromise, thunk))
  );
}


export default SDK
