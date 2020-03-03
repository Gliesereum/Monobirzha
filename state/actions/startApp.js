import {Types} from "../types";
import sdk from "../../sdk";

export function startApp() {
  return async dispatch => {
    dispatch({type: Types.start.START});
    try {

      await dispatch({
        type: Types.start.SUCCESS,
        payload: {
          status: await sdk.api.statusApi(),
          ovdpList: await sdk.api.getOvdpList()
        }
      });

      const legalToken = await sdk.storage.getStorage('LegalToken');

      if(legalToken){
        await dispatch({
          type: Types.start.LEGAL,
          payload: legalToken
        });
      }

      await setTimeout(async () => {
        await dispatch({type: Types.start.FINISH});
      }, 800)
    } catch (e) {
      dispatch({
        type: Types.start.ERROR,
        payload: e
      });
      setTimeout(() => {
        dispatch({
          type: Types.start.FINISH});
      }, 800)
    }
  }
}
