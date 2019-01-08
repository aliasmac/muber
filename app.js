const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// routes is a function()
const routes = require('./routes/routes')
const app = express()

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber', {useNewUrlParser: true})
} 

// *can use app.use to register an type of midleware
// place app.use above routes call so that the body-parser middleware takes effect 
// before routing, thus giving routes access to req.body
app.use(bodyParser.json()) // middleware #1
routes(app) // middleware #2 - our routes handler is also a middleware!
app.use((err, req, res, next) => { // middleware #3
  res.status(422).send({ error: err._message })
})
// args key:
// err = populated if any of above routes throw an error --> {}
// req = incoming req object --> {}
// res = outgoing response object  --> {}
// next = call next() to move onto the next middleware in chain 

module.exports = app


