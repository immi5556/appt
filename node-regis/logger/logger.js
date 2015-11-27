
var wrapper = function(){

 var moment = require('moment');
 var getTime = function(){
    return moment().format();
 }

 var consoleSent = function (req, res) {
    return function (err) {
      if (err) {
        console.log("[Error Console:" + getTime() +"] : " + err);
        res.status(err.status).end();
      }
      else {
        console.log("[Sent Console:" + getTime() +"] : " + (req.params.jsfile || req.params.cssfile || req.params.imgfile));
      }
    }
  };

  var Log= function () {
    var args = Array.prototype.slice.call(arguments);
    args = args.length > 1 ? args.join(' ') : args;
    console.log("[Log Console:" + getTime() +"] : " + args);
  }

  return {
    consoleLog: consoleSent,
    log: Log
  }
}

module.exports.logger =  wrapper();