import {Types} from "../types";
import sdk from "../../sdk";

export function getOrderListAction() {
  return async dispatch => {
    dispatch({type: Types.orders.START_LIST});
    try {

      const legalToken = await sdk.storage.getStorage('LegalToken');

      const {response} = await sdk.api.getOrderList(legalToken);

      await dispatch({
        type: Types.orders.SUCCESS_LIST,
        payload: response
      });

      await setTimeout(async () => {
        await dispatch({type: Types.orders.FINISH_LIST});
      }, 1800)

    } catch (e) {
      setTimeout(async () => {
        dispatch({type: Types.orders.FINISH_LIST});
      }, 1800)
    }
  }
}
