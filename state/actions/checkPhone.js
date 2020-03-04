import {Types} from "../types";
import sdk from "../../sdk";

export function verifyCode(phone, code) {
  return async dispatch => {
    dispatch({type: Types.auth.START_VERIFY_CODE});
    try {
      let phoneParse = phone.replace(new RegExp(/[&\/\\#,+()$~%.'":*?<>{}]/g), '');
      const result = await sdk.api.verifyCode(phoneParse, code);

      await sdk.storage.setStorage(
        'LegalToken',
        result.response.legal_token
      );

      await dispatch({
        type: Types.auth.SUCCESS_VERIFY_CODE,
        payload: result
      });

      dispatch({type: Types.auth.START_BROKER_ACCOUNT});

      const {response: { brokerId, brokerAccount }} = await sdk.api.getAccountInfo(result.response.legal_token);

      await dispatch({
        type: Types.auth.ACCOUNT,
        payload: {
          brokerId: brokerId,
          brokerAccount: brokerAccount
        }
      });

      await setTimeout(async () => {
        await dispatch({
          type: Types.auth.FINISH_VERIFY_CODE
        });
      }, 800)

      await setTimeout(async () => {
        await dispatch({
          type: Types.auth.FINISH_BROKER_ACCOUNT
        });
      }, 2800)
    } catch (e) {
      dispatch({
        type: Types.auth.ERROR_VERIFY_CODE,
        payload: e
      });
      setTimeout(() => {
        dispatch({
          type: Types.auth.FINISH_VERIFY_CODE
        });
      }, 800)
    }
  }
}

export function checkPhone(phone) {
  return async dispatch => {
    dispatch({type: Types.auth.START_CHECK_PHONE});
    try {
      let phoneParse = phone.replace(new RegExp(/[&\/\\#,+()$~%.'":*?<>{}]/g), '');
      const result = await sdk.api.checkPhone(phoneParse);

      console.log(result);

      await dispatch({
        type: Types.auth.SUCCESS_CHECK_PHONE,
        payload: result
      });

      await setTimeout(async () => {
        await dispatch({
          type: Types.auth.FINISH_CHECK_PHONE
        });
      }, 800)
    } catch (e) {
      dispatch({
        type: Types.auth.ERROR_CHECK_PHONE,
        payload: e
      });
      setTimeout(() => {
        dispatch({
          type: Types.auth.FINISH_CHECK_PHONE
        });
      }, 800)
    }
  }
}

export function resetStatePhone() {
  return dispatch => {
    dispatch({type: Types.auth.RESET_CHECK_PHONE});
  }
}


export function logOut() {
  return async dispatch => {
    await sdk.storage.remove('LegalToken')
    dispatch({type: Types.auth.LOG_OUT});
  }
}
