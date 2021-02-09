const { htmlToText } = require("html-to-text");

const strip = (text) => htmlToText(text);

const pipe = (...fns) => {
  return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
};

const wordsScore = (text) => {
  text = String(text);
  text = text.replace(/[\n\t]/g, "");
  text = text.replace(/[()\[\];:"',.]/g, "");
  text = text.toLowerCase();

  const words = text.split(/\s+/).filter(Boolean);
  const result = {};
  for (let i = 0; i < words.length; i++) {
    if (result[words[i]] == null) {
      result[words[i]] = 1;
    } else {
      result[words[i]] += 1;
    }
  }

  return result;
};

module.exports = {
  pipe,
  strip,
  wordsScore,
};
