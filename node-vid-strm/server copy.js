var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');

var indexPage, m1, m2, m3;


fs.readFile(path.resolve(__dirname,"1.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    m1 = data;
});
fs.readFile(path.resolve(__dirname,"2.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    m2 = data;
});

fs.readFile(path.resolve(__dirname,"3.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    m3 = data;    
});
        
// create http server
/*
http.createServer(function (req, res) {
    
    var reqResource = url.parse(req.url).pathname;
    //console.log("Resource: " + reqResource);

    if(reqResource == "/"){
    
        //console.log(req.headers)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexPage);
        res.end();

    } else if (reqResource == "/favicon.ico"){
    
        res.writeHead(404);
        res.end();
    
    } else {

            var total;
            if(reqResource == "/movie.mp4"){
                total = movie_mp4.length;
            } else if(reqResource == "/movie.ogg"){
                total = movie_ogg.length;
            } else if(reqResource == "/movie.webm"){
                total = movie_webm.length;
            } 
                
            var range = req.headers.range;

            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            // if last byte position is not present then it is the last byte of the video file.
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end-start)+1;

            if(reqResource == "/movie.mp4"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/mp4"});
                res.end(movie_mp4.slice(start, end+1), "binary");

            } else if(reqResource == "/movie.ogg"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/ogg"});
                res.end(movie_ogg.slice(start, end+1), "binary");

            } else if(reqResource == "/movie.webm"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/webm"});
                res.end(movie_webm.slice(start, end+1), "binary");
            }
    }
}).listen(8888); */


/*
http.createServer(function (req, res) {
  if (req.url != "/1.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://192.168.1.100:8881/1.mp4" controls></video>');
  } else {
    console.log("reached..");
    console.log(req.headers.range);
    var file = path.resolve(__dirname,"1.mp4");
    var range = req.headers.range;
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);

    fs.stat(file, function(err, stats) {
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
  }
}).listen(8881); 

*/

 http.createServer(function (req, res) {
    console.log(req.url);
    if(req.url === "/index.html"){
       fs.readFile("index.html", function (err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
       });
    }
    else if (req.url == "/1.mp4") {
        console.log("reached.. - 1.mp4");
        console.log(req.headers.range);
        var file = path.resolve(__dirname,"1.mp4");
        var range = req.headers.range;
        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);

        fs.stat(file, function(err, stats) {
          var total = stats.size;
          var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
          var chunksize = (end - start) + 1;

          res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
          });

          res.end(m1.slice(start, end + 1), "binary");
          /*var stream = fs.createReadStream(file, { start: start, end: end })
            .on("open", function() {
              stream.pipe(res);
            }).on("error", function(err) {
              res.end(err);
            });*/
        });
    } 
}).listen(8882); 