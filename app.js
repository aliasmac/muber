const express = require('express')
const bodyParser = require('body-parser')
// routes is a function()
const routes = require('./routes/routes')
const app = express()

// place app.usee above routes call
app.use(bodyParser.json())
routes(app)

module.exports = app

