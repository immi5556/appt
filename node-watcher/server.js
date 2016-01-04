var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');

// One-liner for current directory, ignores .dotfiles
//chokidar.watch('./../node-regis/content/uploads/logos', {ignored: /[\/\\]\./}).on('all', function(event, path1) {
fs.watch('./../node-regis/content/uploads/logos', {persistent: true}).on('all', function(event, fnn) {
  console.log(event, fnn);
  if (event == 'change'){
  	//var fnn = path.basename(path1);
  	fs.createReadStream('./../node-regis/content/uploads/logos/' + fnn).pipe(fs.createWriteStream('./../node-sched/public/images/logos/' + fnn));
  }
});