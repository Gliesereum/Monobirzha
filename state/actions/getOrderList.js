import {Types} from "../types";
import sdk from "../../sdk";

export function getOrderListAction({ mode }) {
  return async dispatch => {
    dispatch({type: Types.orders.START_LIST});
    try {
      await dispatch({
        type: Types.orders.CHANGE_STATUS_MODE,
        payload: mode || 'all',
      });

      if (mode) {
        await dispatch({
          type: Types.orders.SUCCESS_FILTER_LIST,
          payload: { mode: mode },
        });
      } else {
        const legalToken = await sdk.storage.getStorage('LegalToken');
        const { response } = await sdk.api.getOrderList(legalToken);
        await dispatch({
          type: Types.orders.SUCCESS_LIST,
          payload: response
        });
      }

      await setTimeout(async () => {
        await dispatch({type: Types.orders.FINISH_LIST});
      }, 300)

    } catch (e) {
      setTimeout(async () => {
        dispatch({type: Types.orders.FINISH_LIST});
      }, 300)
    }
  }
}
