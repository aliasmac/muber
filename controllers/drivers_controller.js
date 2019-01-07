module.exports = {
  // ES5 syntax: 
  // greeting: function(req, res) { }

  // ES6 syntax
  greeting(req, res) {
    res.send({ hi: 'there' })
  },

  create(req, res) {

  }

}