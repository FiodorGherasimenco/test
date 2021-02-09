import { useState } from "react";
import { connect } from "react-redux";
import { getTopicWordsRank } from "../actions/topics";

const Search = ({ getTopicWordsRank }) => {
  const [title, setTitle] = useState("");

  const searchTopic = () => {
    if (title.trim().length) {
      getTopicWordsRank(title);
    }
    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button onClick={searchTopic}>Fetch</button>
    </div>
  );
};

const mapDispatchToProps = {
  getTopicWordsRank,
};

export default connect(null, mapDispatchToProps)(Search);
