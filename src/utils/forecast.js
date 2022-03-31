const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=11bc95bafc388225dd48618fb4708c3e&query=${lat},${long}&units=f`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} out. It feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
