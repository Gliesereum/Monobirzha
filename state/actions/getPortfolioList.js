import {Types} from "../types";
import sdk from "../../sdk";

export function getPortfolioList() {
  return async dispatch => {
    dispatch({type: Types.portfolio.START_LIST});
    try {
      const legalToken = await sdk.storage.getStorage('LegalToken');
      const { response } = await sdk.api.getSuccessOrderList(legalToken);

      await dispatch({
        type: Types.portfolio.SUCCESS_LIST,
        payload: response
      });

      await setTimeout(async () => {
        await dispatch({type: Types.portfolio.FINISH_LIST});
      }, 300)

    } catch (e) {
      setTimeout(async () => {
        dispatch({type: Types.portfolio.FINISH_LIST});
      }, 300)
    }
  }
}
