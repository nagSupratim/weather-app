const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoibmFnc3VwcmF0aW0iLCJhIjoiY2txbDZ3b2FmMWNoaDJ2bngwdWhhbWYzaSJ9.-yhSFGo55XdyyuB55l5vxg`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service");
    } else if (body.features.length === 0) {
      callback("No such place found!");
    } else {
      const feature = body.features[0];
      const [longitude, latitude] = feature.center;
      const location = feature.place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
