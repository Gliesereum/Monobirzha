import {Types} from "../types";
import sdk from "../../sdk";

export function verifyCode(phone, code) {
  return async dispatch => {
    dispatch({type: Types.auth.START_VERIFY_CODE});
    try {
      const result = await sdk.api.verifyCode(phone, code);
      console.log(result.response.legal_token);

      await sdk.storage.setStorage(
        'LegalToken',
        result.response.legal_token
      );

      await dispatch({
        type: Types.auth.SUCCESS_VERIFY_CODE,
        payload: result
      });
      await setTimeout(async () => {
        await dispatch({
          type: Types.auth.FINISH_VERIFY_CODE
        });
      }, 800)
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
      const result = await sdk.api.checkPhone(phone);
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
