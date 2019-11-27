const _ = require('lodash');

const shapeResponse = (json) => {
  const { summary, temperature } = _.get(json, 'currently');

  const title = {
    type: "title",
    text: "NYC",
    link: "https://en.wikipedia.org/wiki/New_York_City"
  };
  
  const data = {
    type: "shortText",
    text: summary,
    label: `${Math.floor(temperature)}°F`
  };

  return { contents: [title, data] };
};

module.exports = shapeResponse;
