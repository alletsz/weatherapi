const express = require('express');
const app = express();
const port = 7002;
const fetch = require('node-fetch');
require('dotenv').config() //tell server to load anything in .env to an environment variable
const bodyParser = require('body-parser')

// console.log(process.env)
const api_key = process.env.API_KEY

app.use(bodyParser.json())

// get all
app.get('/forecast', (req, res) => {
  fetch(`https://api.darksky.net/forecast/${api_key}/42.3601,-71.0589`)
    .then(response => response.json()) //promise results to an object
    .then(resObj => {
      res.send(resObj)
    })
});

// get with exclusions
app.get('/hourly', (req, res) => {
  fetch(`https://api.darksky.net/forecast/${api_key}/42.3601,-71.0589/?exclude=minutely,daily,alerts,flags`)
    .then(response => response.json()) //promise results to an object
    .then(resObj => {
      res.send(resObj)
    })
});

// get and return date and hourly weather info
app.get('/day', (req, res) => {
  fetch('https://api.darksky.net/forecast/390b0c743dc9817aa92fc025e346335f/42.3601,-71.0589/?exclude=minutely,daily,alerts,flags')
    .then(response => response.json()) //promise results to an object
    .then(resObj => {
      const hoursArray = resObj.hourly.data
      let timeVal = hoursArray.map((time) => {
        return new Date(time.time * 1000).toISOString()
      })

      let weather = hoursArray.map((weather) => {
        return weather.summary
      })

      let data = {
        hours: timeVal,
        summary: weather
      }

      res.send({ hour: timeVal, weather: weather })
    })
});


// get info based on latitude and longitude provided by user
app.post('/:lat/:lon', (req, res) => {

  const lat = req.params.lat
  const lon = req.params.lon

  fetch(`https://api.darksky.net/forecast/${api_key}/${lat},${lon}`)
    .then(response => response.json())
    .then(resObj => {
      res.status(201)
      res.send(resObj)
    })
});


app.listen(port, () => {
  console.log(`Your weather app is listening on ${port}!!`)
})
