const app = require('./app')

// app.listen is telling app to listen to incoming http request on specified port
app.listen(3050, () => {
  console.log('Running on port 3050')
})

