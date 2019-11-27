const _ = require("lodash");
const cors = require("cors");
const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
const shapeResponse = require("./helpers");
const { PORT, CLIENT_ORIGIN } = require("./config");
const { postToAircall, getWeatherData } = require("./requests");

const app = express();
const jsonParser = bodyParser.json();

app.set("port", PORT);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const postCard = async (callId, data) => {
  try {
    return await postToAircall(callId, data);
  } catch (err) {
    console.error(chalk.red("Error posting card", err.message));
  }
};

app.get('/', (req, res) => {
  res.json({'message': 'Server is running'});
});

app.post("/aircall/calls", jsonParser, async (req, res) => {
  const { event, data } = _.get(req, "body");
  if (event === "call.created" && data.direction === "inbound") {
    try {
      const results = await getWeatherData();
      const contents = shapeResponse(results);
      return await postCard(data.id, contents);
    } catch (err) {
      console.error(chalk.red("Error getting weather", err.message));
    }
  } else {
    console.log("Event non-handled:", event, data.direction);
  }
});

app.listen(app.get("port"), () => {
  console.log("Node app is running on port", app.get("port"));
});
