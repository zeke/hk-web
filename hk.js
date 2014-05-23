require("dotenv").load()
var merge = require("merge")
var spawn = require('child_process').spawn

var hk = module.exports = (function() {

  function hk(token) {
    this.token = token || process.env.HEROKU_API_KEY
    this.options = {
      env: merge(process.env, {HEROKU_API_URL: "https://:" + this.token + "@api.heroku.com"})
    }
    return this
  }

  hk.prototype.run = function(args, cb) {
    if (typeof(args) === "string" && args)
      args = args.split(" ")

    var ps = spawn("hk", args, this.options)
    var output = ""

    ps.stdout.on('data', function(data) {
      output += data.toString()
      // process.stdout.write(data)
    })

    ps.stderr.on('data', function(data) {
      output += data.toString()
      // process.stdout.write(data)
    })

    ps.on('exit', function(code) {
      cb(null, output, code)
      // process.exit(code)
    })

  }

  hk.init = function(token) {
    return new hk(token)
  }

  return hk

})()
