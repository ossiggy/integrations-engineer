require("dotenv").config();
const request = require("request-promise");
const { AIRCALL_ID, AIRCALL_TOKEN, WEATHER_TOKEN } = require('./config');

const getWeatherData = () => {
  const options = {
    uri: "https://dark-sky.p.rapidapi.com/40.730610,-73.935242",
    headers: {
      "x-rapidapi-host": "dark-sky.p.rapidapi.com",
	    "x-rapidapi-key": WEATHER_TOKEN
    },
    json: true
  };

  return request(options);
};

const postToAircall = (id, contents) => {
  const options = {
    uri: `https://${AIRCALL_ID}:${AIRCALL_TOKEN}@api.aircall.io/v1/calls/${id}/insight_cards`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(contents)
  };

  return request(options);
}

module.exports = { 
  postToAircall,
  getWeatherData
};
