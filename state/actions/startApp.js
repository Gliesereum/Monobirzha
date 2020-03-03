import {Types} from "../types";
import sdk from "../../sdk";

export function startApp() {
  return async dispatch => {
    dispatch({type: Types.start.START});
    try {
      await dispatch({
        type: Types.start.SUCCESS,
        payload: await sdk.api.statusApi()
      });
      await setTimeout(async () => {
        await dispatch({type: Types.start.FINISH});
      }, 800)
    } catch (e) {
      dispatch({
        type: Types.start.ERROR,
        payload: e
      });
      setTimeout(() => {
        dispatch({type: Types.start.FINISH});
      }, 800)
    }
  }
}
