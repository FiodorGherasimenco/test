const stripTags = (text) => String(text).replace(/<[^>]+>/g, "");

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

const getWordsScore = (text) => {
  text = String(text);
  text = text.replace(/[\n\t]/g, "");
  text = text.replace(/[\[\]\(\)]/g, "");
  text = text.replace(/[:;,."]/g, "");
  text = text.replace(/\'+\s/g, " ");
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

const getMaxWordScore = (wordsScore) => {
  let maxCounter = 0;
  for (let key in wordsScore) {
    if (maxCounter < wordsScore[key]) {
      maxCounter = wordsScore[key];
    }
  }

  return maxCounter;
};

const wordsRating = (wordsScore, maxWordScore, rating) => {
  const ratingStep = 100 / rating;
  const result = [];
  for (let key in wordsScore) {
    const percentage = wordsScore[key] * 100 / maxWordScore;
    const rate = Math.ceil(percentage / ratingStep);
    result.push({
      word: key,
      score: wordsScore[key],
      rating: rate,
    });
  }

  return result;
};

module.exports = {
  pipe,
  curry,
  stripTags,
  getWordsScore,
  getMaxWordScore,
  wordsRating,
};
