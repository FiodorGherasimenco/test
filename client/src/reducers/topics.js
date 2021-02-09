import { FETCH_TOPIC_RANKED_WORDS } from "../actions/topics";

const initialState = {
  topicRankedWords: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPIC_RANKED_WORDS:
      return { ...state, topicRankedWords: action.payload };
    default:
      return state;
  }
};

export default reducer;
