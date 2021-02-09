const { htmlToText } = require("html-to-text");

const strip = (text) => htmlToText(text);

const pipe = (...fns) => {
  return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
};

const wordСounter = (text) => {
  text = String(text);
  text = text.replace(/[\n\t]/g, "");
  text = text.replace(/[()\[\];:"',.]/g, "");
  text = text.toLowerCase();

  const words = text.split(/\s+/).filter(Boolean);
  const score = {};
  for (let i = 0; i < words.length; i++) {
    if (score[words[i]] == null) {
      score[words[i]] = 1;
    } else {
      score[words[i]] += 1;
    }
  }

  return score;
};

module.exports = {
  pipe,
  strip,
  wordСounter,
};
