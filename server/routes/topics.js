const express = require("express");
const { pipe, strip, wordСounter } = require("../common/utils");
const { getTopicByTitle } = require("../services/topics");
const router = express.Router();

router.get("/ranked", async (req, res) => {
  const topic = await getTopicByTitle(req.query.term);
  if (topic == null) {
    res.json({});
    return;
  }

  const score = pipe(strip, wordСounter)(topic.extract);

  res.json(score);
});

module.exports = router;
