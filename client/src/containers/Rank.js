import { connect } from "react-redux";

const Rank = ({ words }) => {
  return (
    <ul>
      {words &&
        Object.entries(words).map(([word, counter], i) => (
          <li key={i}>
            {word} 
            <strong>{counter}</strong>
          </li>
        ))}
    </ul>
  );
};

const mapStateToProps = ({ topics }) => {
  return {
    words: topics.topicRankedWords,
  };
};

export default connect(mapStateToProps)(Rank);
