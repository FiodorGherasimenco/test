const express = require("express");
const {
  pipe,
  strip,
  wordsScore,
  wordsRating,
  curry,
} = require("../common/utils");
const { getTopicByTitle } = require("../services/topics");
const router = express.Router();

const RATING_STEP = 20;

router.get("/ranked", async (req, res) => {
  const topic = await getTopicByTitle(req.query.term);
  if (topic == null) {
    res.json({});
    return;
  }

  const result = pipe(
    strip,
    wordsScore,
    curry(wordsRating)(RATING_STEP)
  )(topic.extract);
  res.json(result);
});

module.exports = router;
