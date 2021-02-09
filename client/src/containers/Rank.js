import { connect } from "react-redux";

const Rank = ({ words }) => {
  let maxCounter = 0;
  for (let key in words) {
    if (maxCounter < words[key]) {
      maxCounter = words[key];
    }
  }

  const groups = [100, 75, 50, 25, 0];
  const result = [];
  for (let key in words) {
    const wordPercantage = Math.ceil((words[key] * 100) / maxCounter);
    for (let i = 0; i < groups.length; i++) {
      if (wordPercantage >= groups[i]) {
        if (result[i] == null) {
          result[i] = [key];
        } else {
          result[i].push(key);
        }
        break;
      }
    }
  }

  return (
    <ul>
      {result.map((words, i) =>
        words.map((word, j) => (
          <li key={j}>
            {word} -{" "}
            <strong>
              (
              {Array(result.length - i)
                .fill("*")
                .join("")}
              )
            </strong>
          </li>
        ))
      )}
    </ul>
  );
};

const mapStateToProps = ({ topics }) => {
  return {
    words: topics.topicRankedWords,
  };
};

export default connect(mapStateToProps)(Rank);
