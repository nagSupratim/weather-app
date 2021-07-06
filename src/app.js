const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    pageTitle: 'Weather',
    name: 'Supratim Nag',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    pageTitle: 'About Me',
    name: 'Supratim Nag',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    pageTitle: 'Help',
    helpMessage: 'This is some helpful text',
    name: 'Supratim Nag',
  });
});

//returning json-data
app.get('/weather', (req, res) => {
  //check if query contains : address
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  //fetching weather data for the input address
  const address = req.query.address;
  geocode(address, (e1, { latitude, longitude, location } = {}) => {
    //checkng if geolocation fetch encountered error
    if (e1) {
      return res.send({
        error: e1,
      });
    }
    //got geolocation successfully | calling weather data
    forecast(latitude, longitude, (e2, forecastData) => {
      //checkng if weather fetch encountered error
      if (e2) {
        return res.send({
          error: e2,
        });
      }
      //got the weather data successfully
      //sending back json-response
      res.send({ address, ...forecastData, location });
    });
  });
});

//error routes
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error',
    pageTitle: 'Error',
    errorMessage: '404 - Help Article not found!',
    name: 'Supratim nag',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error',
    pageTitle: 'Error',
    errorMessage: '404 - Page not found!',
    name: 'Supratim Nag',
  });
});

//listening to port 3000
app.listen(3000, () => {
  console.log('Server running on port : 3000');
});
