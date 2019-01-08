const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Drivers controller', () => {


  it('Post to /api/drivers creates a new driver', done => {
    // 3 ways to make an assertion:
    // #1 send the created driver instance back in the response 
    // #2 check the mongoose collection for the driver
    // #3 take a count of the driver collection before and after creation 

    // Method 3:
    Driver.countDocuments().then(count => {
      request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end((err, response) => {       
        Driver.countDocuments().then(newCount => {
          assert(count + 1 === newCount) 
          done()
        })
      })  
    })
  })

  it('PUT to api/driver/:id edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false })
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com'})
            .then(driver => {
              assert(driver.driving === true)
              done()
            })
        })
    })
  })

  it('DELETE to api/drivers/:id deletes an existing record', done => {
    const driver = new Driver({ email: 'm@m.com' })
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({email: 'm@m.com'})
            .then(driver => {
              assert(driver === null)
              done()
            })
        })
    })
  })

  it('GET to api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seatle@test.com',
      geometry: {type: 'Point', coordinates: [-122.4759902, 47.6147628]}
    })
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {type: 'Point', coordinates: [-80.253, 25.791] }
    })

    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].email === 'miami@test.com');
            done()
          })
      })


  })


})

