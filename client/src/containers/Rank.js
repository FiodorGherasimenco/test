import { connect } from "react-redux";

const Rank = ({ words }) => {
  words.sort((a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  });

  const repeatText = (text, times = 0) => {
    let result = "";
    while (times) {
      result += text;
      times--;
    }
    return result;
  };

  return (
    <div>
      {words.map(({ word, rating }) => (
        <div>
          {word} - <strong>({repeatText("*", rating)})</strong>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ topics }) => {
  return {
    words: topics.topicRankedWords,
  };
};

export default connect(mapStateToProps)(Rank);
