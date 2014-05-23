var hk = require("../hk.js")
var assert = require("assert")

describe("hk", function() {

  it("shows usage info when given no arguments", function(done){
    hk.init().run("", function(err, output) {
      assert(!err)
      assert(output.match(/show ssl endpoint info/))
      done()
    })
  })

  it("lists apps", function(done){
    hk.init().run("apps", function(err, output) {
      if (err) throw err
      assert(output.split("\n").every(function(line){
        // look for the region on each line of output. (lame test)
        return line.match("us") || line.match("eu") || line.length < 1
      }))
      done()
    })
  })

})
