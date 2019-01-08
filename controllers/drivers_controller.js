const Driver = require('../models/driver')

module.exports = {
  // ES5 syntax: 
  // greeting: function(req, res) { }

  // ES6 syntax
  greeting(req, res) {
    res.send({ hi: 'there' })
  },

  index(req, res, next) {
    const { lng, lat } = req.query; // express uses .query to pull of data from URL e.g. 'http://gogle.com?lng=80&lat=20
    const point = {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
    };
    Driver.aggregate([
        {
          $geoNear: { 
              near: point,
              spherical: true,
              maxDistance: 200000, //200,000 meters OR 200KM
              distanceField: 'dist.calculated'
          }
        }
      ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },


  create(req, res, next) {
    const driverProps = req.body
    // Model.create noth creates and saves the instance to the database
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  },

  edit(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body

    Driver.findByIdAndUpdate({ _id: driverId } , driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete(req, res, next) {
    const driverId = req.params.id
    
    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next)
  }

}


// Another Solution:
// index(req, res, next) {
//   const {lng, lat} = req.query;

//   Driver.find({
//       'geometry.coordinates': {
//           $nearSphere: {
//               $geometry: {
//                   type: "Point",
//                   coordinates: [lng, lat]
//               },
//               $maxDistance: 200000
//           }
//       }
//   })
//       .then(drivers => res.send(drivers))
//       .catch(next);
// },