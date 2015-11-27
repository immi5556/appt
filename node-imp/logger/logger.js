var wrapper = function(){
 var consoleSent = function (req, res) {
    return function (err) {
      if (err) {
        console.log("JS Retrive Error: " + err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent:', (req.params.jsfile || req.params.cssfile || req.params.imgfile));
      }
    }
  }

  return {
    consoleLog: consoleSent
  }
}

module.exports.logger =  wrapper();