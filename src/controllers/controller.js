const axios = require('axios')
const API_KEY = '0e83bbb5fcfa0709fec56425f72c0538'
const url = city => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

const Weather = require('../model/weather')


module.exports = {
  renderHomePage: (req, res) => {
    res.render('index')
  },
  getWeather: (req, res) => {
    const city = req.body.city
    const weather = new Weather(city)
    weather.validateUserInput()

    if (weather.errors.length) {
      res.render('index', {
        error: weather.errors.toString()
      })
    } else {
      axios.get (url(city))
        .then(response => {
          const { main, name } = response.data
          const curWeather = `It is currently ${main.temp} degrees Celius in ${name}`
          res.render('index', {
            weather: curWeather
          })
        })
        .catch(error => {
          console.log('#####', error)
        })
    }
  },
  renderAboutPage: (req, res) => {
    res.render('about')
  }
}