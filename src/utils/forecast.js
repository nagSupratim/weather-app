const request = require('request');

const forecast = (latiude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0a34e720e5b1cbbe37b030db0315cfc7&query=${encodeURIComponent(
    latiude
  )} , ${encodeURIComponent(longitude)}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) callback('Unable to connect to weather service');
    else if (body.error) callback('Unable to find location');
    else {
      const current = body.current;
      const {
        weather_descriptions: [weather],
        temperature,
        feelslike,
      } = current;
      callback(undefined, { weather, temperature, feelslike });
    }
  });
};
module.exports = forecast;
