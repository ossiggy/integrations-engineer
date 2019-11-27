const PORT = process.env.PORT || 8080;
const AIRCALL_ID = process.env.AIRCALL_ID || "";
const AIRCALL_TOKEN = process.env.AIRCALL_TOKEN || "";
const WEATHER_TOKEN = process.env.WEATHER_TOKEN || "";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

module.exports = {
  PORT,
  AIRCALL_ID,
  AIRCALL_TOKEN,
  WEATHER_TOKEN,
  CLIENT_ORIGIN
};
