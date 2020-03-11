import {Types} from "../types";
import sdk from "../../sdk";

export function getBrokerAccInfo() {
  return async dispatch => {
    dispatch({type: Types.auth.START_BROKER_ACCOUNT});
    try {
      const legal = await sdk.storage.getStorage('LegalToken');
      const account = await sdk.api.getAccountInfo(legal);

      await dispatch({
        type: Types.auth.ACCOUNT,
        payload: {
          brokerId: account.response.brokerId,
          brokerAccount: account.response.brokerAccount
        }
      });

      await setTimeout(async () => {
        await dispatch({type: Types.auth.FINISH_BROKER_ACCOUNT});
      }, 1800)

    } catch (e) {

      setTimeout(async () => {
        dispatch({type: Types.auth.FINISH_BROKER_ACCOUNT});
      }, 0)

    }
  }
}

export function requestBrokerAccount() {
  return async dispatch => {
    dispatch({type: Types.auth.START_BROKER_ACCOUNT});
    try {
      const legal = await sdk.storage.getStorage('LegalToken')
      const account = await sdk.api.requestBrokerAcc(legal)

      // console.log(account);

      await dispatch({
        type: Types.auth.SUCCESS_BROKER_ACCOUNT,
        payload: account
      });

      await dispatch({
        type: Types.auth.ACCOUNT,
        payload: {
          brokerId: account.response.brokerId,
          brokerAccount: account.response.brokerAccount
        }
      });

      await setTimeout(async () => {
        await dispatch({
          type: Types.auth.FINISH_BROKER_ACCOUNT
        });
      }, 2800)

    } catch (e) {
      dispatch({
        type: Types.auth.ERROR_BROKER_ACCOUNT,
        payload: e
      });
      setTimeout(() => {
        dispatch({
          type: Types.auth.FINISH_BROKER_ACCOUNT
        });
      }, 800)
    }
  }
}
