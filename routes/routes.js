const DriversController = require('../controllers/drivers_controller')

module.exports = (app) => {
// request handlers listen for incoming http requests on sepecific routes
// i.e. they are the API routes 

// app.get specifies the app to listen for a particular GET http request 
// callback function called with 2 args, request & response i.e. when ever a
// GET request is made to the http://localhost:3050/api route, run the CB function

app.get('/api', DriversController.greeting)

app.post('/api/drivers', DriversController.create)
app.put('/api/drivers/:id', DriversController.edit)
app.delete('/api/drivers/:id', DriversController.delete)
app.get('/api/drivers', DriversController.index)
}
