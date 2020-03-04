import {Types} from "../types";
import sdk from "../../sdk";

export function createOrder(body) {
  return async dispatch => {
    dispatch({ type: Types.orders.START_ACTION });
    try {
      const Token = await sdk.storage.getStorage('LegalToken');
      const Order = await sdk.api.createOrder(body, Token);
      await dispatch({
        type: Types.orders.SUCCESS_ACTION,
        payload: Order,
      });

      await setTimeout(async () => {
        await dispatch({type: Types.orders.FINISH_ACTION});
      }, 800)
    } catch (e) {
      dispatch({
        type: Types.orders.ERROR_ACTION,
        payload: e,
      });
      await setTimeout(async () => {
        await dispatch({type: Types.orders.FINISH_ACTION});
      }, 800)
    }
  }
}
