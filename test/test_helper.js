const mongoose = require('mongoose')

// In app js, we add an if statement to check if the process.env.NODE_ENV is 
// 'test, we could have chained the below statment on an 'else' statement but then 
// we wouldn't have had access to the helpers mocha makes available to us 
// via the before function
before(done => {
  mongoose.connect('mongodb://localhost/muber_test', { useNewUrlParser: true })
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error)
    })
})

beforeEach ((done) => {
  // GOTCHA: when mongoose loads up the connections from MongoDB, it lowercases the name
  // of the collections!! 
  const { drivers } = mongoose.connection.collections 
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }) )
    .then(() => done())
    .catch(() => done()) 
});    

