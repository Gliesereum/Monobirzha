import {createReducer} from "../sdk/mono";
import {Types} from "./types";
import {initState} from "./initState";

export default createReducer({
  //---------------  START  -----------------//

  [Types.start.START]:
      draft => draft.root.loading = true,

  [Types.start.SUCCESS]: (draft, {status, ovdpList}) => {
    draft.root.status = status;
    draft.ovdpList = ovdpList;
  },

  [Types.start.LEGAL]: (draft, {token}) => {
    draft.auth.token = token;
  },

  [Types.auth.ACCOUNT]: (draft, {brokerId, brokerAccount}) => {
    draft.auth.brokerId = brokerId;
    draft.auth.brokerAccount = brokerAccount;
  },

  [Types.start.ERROR]: (draft, payload) => {
    draft.root.error = payload;
  },

  [Types.start.FINISH]:
      draft => draft.root.loading = false,

  //---------------  PHONE CHECK  -----------------//

  [Types.auth.START_CHECK_PHONE]:
      draft => draft.auth.loading = true,

  [Types.auth.SUCCESS_CHECK_PHONE]: (draft, payload) => {
    draft.auth.phoneRequest = !!payload;
  },

  [Types.auth.ERROR_CHECK_PHONE]: (draft, payload) => {
    draft.auth.error = payload;
  },

  [Types.auth.FINISH_CHECK_PHONE]:
      draft => draft.auth.loading = false,

  [Types.auth.RESET_CHECK_PHONE]:
    draft => draft.auth.phoneRequest = false,

  //---------------  SMS VERIFY  -----------------//

  [Types.auth.START_VERIFY_CODE]:
    draft => draft.auth.authLoading = true,

  [Types.auth.SUCCESS_VERIFY_CODE]: (draft, payload) => {
    draft.auth.token = payload.response.legal_token;
  },

  [Types.auth.ERROR_VERIFY_CODE]: (draft, payload) => {
    draft.auth.error = payload;
  },

  [Types.auth.FINISH_VERIFY_CODE]:
    draft => draft.auth.authLoading = false,

  [Types.auth.LOG_OUT]: (draft) => {
    draft.auth.token = null;
    draft.auth.phoneRequest = false;
    draft.auth.brokerId = null;
    draft.auth.phone = null;
    draft.auth.brokerAccount = 0;
    draft.auth.bankIdAccount = null;
    draft.auth.faceIdActive = null;
    draft.auth.localPinCodeActive = null;
  },

  //---------------  BROKER ACCOUNT  -----------------//

  [Types.auth.START_BROKER_ACCOUNT]:
    draft => draft.auth.requestLoading = true,

  [Types.auth.SUCCESS_BROKER_ACCOUNT]: (draft, payload) => {
    draft.auth.brokerId = payload.response.brokerId;
    draft.auth.brokerAccount = payload.response.brokerAccount;
  },

  [Types.auth.FINISH_BROKER_ACCOUNT]:
    draft => draft.auth.requestLoading = false,

  //---------------  SINGLE BOND  -----------------//

  [Types.single.START]:
    draft => draft.single.loading = true,

  [Types.single.SUCCESS]:(draft, payload) =>
    draft.single.bond = payload,

  [Types.single.ERROR]: (draft, payload) =>
    draft.single.error = payload,

  [Types.single.FINISH]:
    draft => draft.single.loading = false,

  // ---------------  ORDERS ACTION -----------------//

  [Types.orders.START_ACTION]:
    draft => draft.orders.loading = true,

  [Types.orders.SUCCESS_ACTION]:(draft, payload) => {
    draft.orders.list = draft.orders.list.concat(payload);
    draft.orders.error = undefined;
    draft.single.actionError = undefined;
  },

  [Types.orders.ERROR_ACTION]: (draft, payload) => {
    draft.orders.error = payload;
    draft.single.actionError = payload;
  },

  [Types.orders.FINISH_ACTION]:
    draft => draft.orders.loading = false,

  // ---------------  ORDERS  -----------------//

  [Types.orders.START_LIST]: draft => draft.orders.loading = true,

  [Types.orders.SUCCESS_LIST]:(draft, payload) => {
    draft.orders.list = payload;
    draft.orders.filteredList = payload;
  },

  [Types.orders.ERROR_ACTION]: (draft, payload) =>
    draft.orders.error = payload,

  [Types.orders.FINISH_LIST]: draft => draft.orders.loading = false,

  [Types.orders.CHANGE_STATUS_MODE]: (draft, payload) => draft.orders.mode = payload,

  [Types.orders.SUCCESS_FILTER_LIST]: (draft, payload) => {
    if (payload.mode === 'all') {
      return draft.orders.filteredList = draft.orders.list;
    }
    draft.orders.filteredList = draft.orders.list.filter(item => item.status === payload.mode);
  },

  // ---------------  PORTFOLIO LIST  -----------------//
  [Types.portfolio.START_LIST]: draft => draft.portfolio.loading = true,

  [Types.portfolio.SUCCESS_LIST]: (draft, payload) => {
    draft.portfolio.list = payload;
  },

  [Types.portfolio.ERROR_LIST]: (draft, payload) =>
    draft.portfolio.error = payload,

  [Types.portfolio.FINISH_LIST]: draft => draft.portfolio.loading = false,

}, initState);
