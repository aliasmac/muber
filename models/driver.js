const mongoose = require('mongoose')
const DriverSchema = mongoose.Schema

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Booelan,
    default: false
  }
})

const Driver  = mongoose.model('driver', DriverSchema)
module.exports = Driver

