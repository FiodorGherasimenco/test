const fetch = require("node-fetch");
const qs = require("querystring");

const API_URL = "https://en.wikipedia.org/w/api.php";
const API_URL_PARAMS = {
  action: "query",
  prop: "extracts",
  format: "json",
  exintro: "",
};

const getTopicsByTitle = async (title) => {
  const query = Object.assign({}, API_URL_PARAMS, {
    titles: title,
  });
  const response = await fetch(`${API_URL}/?${qs.stringify(query)}`);
  const json = await response.json();
  const pages = json.query.pages;
  const result = [];
  for (let key in pages) {
    if (pages[key].pageid != null) {
      result.push({
        title: pages[key].title,
        extract: pages[key].extract,
      });
    }
  }

  return result;
};

const getTopicByTitle = async (title) => {
  const topics = await getTopicsByTitle(title);
  return topics[0];
};

module.exports = {
  getTopicsByTitle,
  getTopicByTitle,
};
