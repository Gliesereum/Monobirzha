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

  [Types.auth.ACCOUNT]: (draft, {brokerId}) => {
    draft.auth.brokerId = brokerId;
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
    draft.auth.brokerAccount = null;
    draft.auth.bankIdAccount = null;
    draft.auth.faceIdActive = null;
    draft.auth.localPinCodeActive = null;
  },

  //---------------  BROKER ACCOUNT  -----------------//

  [Types.auth.START_BROKER_ACCOUNT]:
    draft => draft.auth.requestLoading = true,

  [Types.auth.SUCCESS_BROKER_ACCOUNT]: (draft, payload) => {
    draft.auth.brokerId = payload.response.brokerId;
  },

  [Types.auth.FINISH_BROKER_ACCOUNT]:
    draft => draft.auth.requestLoading = false,


}, initState);
