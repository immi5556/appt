var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('./../node-regis/content/uploads/logos', {ignored: /[\/\\]\./}).on('all', function(event, path1) {
  console.log(event, path1);
  if (event == 'add'){
  	var fnn = path.basename(path1);
  	fs.createReadStream(path1).pipe(fs.createWriteStream('./../node-sched/public/images/logos/' + fnn));
  }
});