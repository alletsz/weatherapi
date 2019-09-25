const express = require('express');
const app = express();
const port = 7002;
const fetch = require('node-fetch');
require('dotenv').config() //tell server to load anything in .env to an environment variable
const bodyParser = require('body-parser')

// console.log(process.env)
const api_key = process.env.API_KEY

app.use(bodyParser.json())
//get with exclusions
// app.get('/', (req, res) => {
//   fetch(`https://api.darksky.net/forecast/${api_key}/42.3601,-71.0589/?exclude=minutely,daily,alerts,flags`)
//     .then(response => response.json()) //promise results to an object
//     .then(resObj => {
//       res.send(resObj)
//     })
// });

app.get('/', (req, res) => {
  fetch(`https://api.darksky.net/forecast/${api_key}/42.3601,-71.0589`)
    .then(response => response.json()) //promise results to an object
    .then(resObj => {
      res.send(resObj.hourly)
    })
});

/*
grab latitude and longitude values from client
comes in as an object {latlon: xxx, xxx}
convert to array and split values [xxx, xxx]
*/

// app.post('/:latlon', (req, res) => {
//   const latlon = req.params.latlon.split(',')
//   const lat = req.params[0]
//   const lon = req.params[1]

// })

/*
comes in as object {lat: xxx, lon: xxx}
*/

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
