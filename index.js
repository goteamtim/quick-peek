var express = require('express');
var Flickr = require('flickrapi');
    
var app = express();

var port = process.env.PORT || 3000;

Flickr.authenticate(flickrOptions, function (error, flickr) {
    // we can now use "flickr" as our API object
    //Handle error here
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/driftly', function (req, res) {
        flickr.photos.search({
            text: "red+panda"
        }, function (err, result) {
            if (err) { throw new Error(err); }
            // do something with result
            res.send(result);
        });

    });

    app.get("/", function (req, res) {
        res.sendFile('index.htm')
    });

    // static files
    app.get(/^(.+)$/, function (req, res) {
        console.log('static file request : ' + req.params);
        res.sendFile(__dirname + req.params[0]);
    });

    app.listen(port, function () {
        console.log('Example app listening on port 3000!');
    });


});



