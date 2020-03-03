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

  [Types.start.LEGAL]: (draft, payload) => {
    draft.auth.token = payload;
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

  //---------------  SINGLE BOND  -----------------//

  [Types.single.START]:
    draft => draft.single.loading = true,

  [Types.single.SUCCESS]:(draft, payload) =>
    draft.single.bond = payload,

  [Types.single.ERROR]: (draft, payload) =>
    draft.single.error = payload,

  [Types.single.FINISH]:
    draft => draft.single.loading = false,

}, initState);
