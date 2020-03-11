import {Types} from "../types";
import sdk from "../../sdk";

function getOvdpDetails({ id }) {
  return async dispatch => {
    dispatch({ type: Types.single.START });
    try {
      const SingleBond = await sdk.api.getOvdpDetails(id);
      await dispatch({
        type: Types.single.SUCCESS,
        payload: SingleBond,
      });

      await setTimeout(async () => {
        await dispatch({type: Types.single.FINISH});
      }, 800)
    } catch (e) {
      dispatch({
        type: Types.single.ERROR,
        payload: e
      });
      setTimeout(() => {
        dispatch({
          type: Types.single.FINISH});
      }, 800)
    }
  }
}

function getSingleOvdp({ ovdp }) {
  return dispatch => {
    dispatch({
      type: Types.single.SUCCESS,
      payload: ovdp,
    });
  }
}

export {
  getOvdpDetails,
  getSingleOvdp,
};
