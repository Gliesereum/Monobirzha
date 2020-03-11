import {Types} from "../types";
import sdk from "../../sdk";
import { ORDER_STATUS } from '../../constants';

function getFullOrdersList() {
  return async dispatch => {
    dispatch({type: Types.orders.START_FULL_LIST});
    try {
      const legalToken = await sdk.storage.getStorage('LegalToken');
      const { response } = await sdk.api.getOrderList(legalToken);

      await dispatch({
        type: Types.orders.SUCCESS_FULL_LIST,
        payload: response,
      });
    } catch (e) {
      dispatch({type: Types.orders.ERROR_FULL_LIST});
    } finally {
      dispatch({ type: Types.orders.FINISH_FULL_LIST })
    }
  }
}

function getSuccessOrdersList() {
  return async dispatch => {
    dispatch({type: Types.orders.START_SUCCESS_LIST});
    try {
      const legalToken = await sdk.storage.getStorage('LegalToken');
      const { response } = await sdk.api.getFilteredOrderList(legalToken, ORDER_STATUS.success);

      await dispatch({
        type: Types.orders.SUCCESS_SUCCESS_LIST,
        payload: response,
      });
    } catch (e) {
      dispatch({type: Types.orders.ERROR_SUCCESS_LIST});
    } finally {
      dispatch({ type: Types.orders.FINISH_SUCCESS_LIST })
    }
  }
}

function getPendingOrdersList() {
  return async dispatch => {
    dispatch({type: Types.orders.START_PENDING_LIST});
    try {
      const legalToken = await sdk.storage.getStorage('LegalToken');
      const { response } = await sdk.api.getFilteredOrderList(legalToken, ORDER_STATUS.pending);

      await dispatch({
        type: Types.orders.SUCCESS_PENDING_LIST,
        payload: response,
      });
    } catch (e) {
      dispatch({type: Types.orders.ERROR_PENDING_LIST});
    } finally {
      dispatch({ type: Types.orders.FINISH_PENDING_LIST })
    }
  }
}

function getCanceledOrdersList() {
  return async dispatch => {
    dispatch({type: Types.orders.START_CANCELED_LIST});
    try {
      const legalToken = await sdk.storage.getStorage('LegalToken');
      const { response } = await sdk.api.getFilteredOrderList(legalToken, ORDER_STATUS.canceled);

      await dispatch({
        type: Types.orders.SUCCESS_CANCELED_LIST,
        payload: response,
      });
    } catch (e) {
      dispatch({type: Types.orders.ERROR_CANCELED_LIST});
    } finally {
      dispatch({ type: Types.orders.FINISH_CANCELED_LIST })
    }
  }
}

export {
  getFullOrdersList,
  getSuccessOrdersList,
  getPendingOrdersList,
  getCanceledOrdersList,
}
