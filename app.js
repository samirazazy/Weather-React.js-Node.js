const express = require('express');
const request = require('request-promise');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// view - Client Side
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
connectDB();

// Database Schema
const citySchema = new mongoose.Schema({
  name: String,
});
const cityModel = mongoose.model('City', citySchema);

async function getWeather(cities) {
  const weatherData = [];

  for (const cityObject of cities) {
    const city = cityObject.name;
    const ApiKey = '0252d32df524c98bd409c60a224c7c93';
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;

    const response = await request(API);

    const weatherJson = JSON.parse(response);

    const weather = {
      city: city,
      temperature: Math.round(weatherJson.main.temp),
      description: weatherJson.weather[0].description,
      icon: weatherJson.weather[0].icon,
    };

    weatherData.unshift(weather);
  }

  return weatherData;
}

app.get('/', function (req, res) {
  cityModel.find({}, function (err, cities) {
    getWeather(cities).then(function (results) {
      const weatherData = { weatherData: results };

      res.render('weather', weatherData);
    });
  });
});

app.post('/', function (req, res) {
  const newCity = new cityModel({ name: req.body.cityName });
  newCity.save();

  res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `server started on port ${PORT} 🎉🎉🎉`);
