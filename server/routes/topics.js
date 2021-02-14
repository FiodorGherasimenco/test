const express = require("express");
const {
  stripTags,
  wordsRating,
  getWordsScore,
  getMaxWordScore,
} = require("../common/utils");
const { getTopicByTitle } = require("../services/topics");
const router = express.Router();

const TOP_RATE = 10;

router.get("/ranked", async (req, res) => {
  const topic = await getTopicByTitle(req.query.term);
  const topicText = stripTags(topic.extract);
  const wordsWithScore = getWordsScore(topicText);
  const maxWordScore = getMaxWordScore(wordsWithScore);
  const wordsWithRating = wordsRating(wordsWithScore, maxWordScore, TOP_RATE);

  res.json(wordsWithRating);
});

module.exports = router;
