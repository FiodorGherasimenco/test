import { API_TOPIC_RANK } from "../config/config";
import { hideLoader, showLoader } from "./app";

export const FETCH_TOPIC_RANKED_WORDS = "FETCH_TOPIC_RANKED_WORDS";

export const getTopicWordsRank = (title) => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await fetch(`${API_TOPIC_RANK}?term=${title}`);
    const result = await response.json();
    dispatch({
      type: FETCH_TOPIC_RANKED_WORDS,
      payload: result,
    });
    dispatch(hideLoader());
  } catch (e) {
    //TODO: show error
    dispatch(hideLoader());
  }
};
