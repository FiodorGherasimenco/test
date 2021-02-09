const { htmlToText } = require("html-to-text");

const strip = (text) => htmlToText(text);

const pipe = (...fns) => {
  return (arg) => fns.reduce((prev, fn) => fn(prev), arg);
};

const curry = (fn, opt_context) =>
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(opt_context || this, args);
    }
    return (...rest) => curried.apply(this, args.concat(rest));
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

const getMaxWordCounter = (wordsScore) => {
  let maxCounter = 0;
  for (let key in wordsScore) {
    if (maxCounter < wordsScore[key]) {
      maxCounter = wordsScore[key];
    }
  }

  return maxCounter;
};

const wordsRating = (groupStep, wordsScore) => {
  const maxWordScore = getMaxWordCounter(wordsScore);
  const totalGroupsCount = 100 / groupStep;
  const result = [];
  for (let key in wordsScore) {
    const wordPercentage = Math.ceil((wordsScore[key] * 100) / maxWordScore);
    let groupIndex = 0;
    for (let i = 0; i < totalGroupsCount; i++) {
      if (wordPercentage >= i * groupStep) {
        groupIndex = i;
      }
    }
    result.push({
      word: key,
      score: wordsScore[key],
      rating: groupIndex + 1,
    });
  }

  return result;
};

module.exports = {
  pipe,
  curry,
  strip,
  wordsScore,
  wordsRating,
};
