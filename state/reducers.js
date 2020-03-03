import {createReducer} from "../sdk/mono";
import {Types} from "./types";
import {initState} from "./initState";

export default createReducer({
  //---------------  START  -----------------//

  [Types.start.START]: draft => draft.root.loading = true,
  [Types.start.SUCCESS]: (draft, payload) => {
    draft.root.status = payload;
  },
  [Types.start.ERROR]: (draft, payload) => {
    draft.root.error = payload;
  },
  [Types.start.FINISH]: draft => draft.root.loading = false,

  //---------------  NEXT  -----------------//

}, initState);
