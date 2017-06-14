var express = require('express');
var Flickr = require('flickrapi');
var flickrOptions = require('./config.js');
console.log(flickrOptions);
var app = express();

var port = process.env.PORT || 3000;
//Flickr.tokenOnly(flickrOptions, function (error, flickr) {
Flickr.authenticate(flickrOptions, function (error, flickr) {
    if (error) {
        console.log(">>>>>>ERROR<<<<<<<<<<<");
    }

    app.get('/getPhotos', function (req, res) {
        flickr.photos.search({
            text: "saint+thomas+islands"
        }, function (err, result) {
            if (err) { throw new Error(err); }
            // do something with result

            res.send(result);
        });

    });

    app.get('/weather/:apiKey/:location', function (req, res) {
        updateWeatherData(req.params.apiKey, req.params.location);
        if (req.params.apiKey !== null) {
            userData.weatherAPIKey = req.params.apiKey;
        }

        res.send(userData.weather);
    });

    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    // static files
    app.get(/^(.+)$/, function (req, res) {
        console.log('static file request : ' + req.params);
        res.sendFile(__dirname + req.params[0]);
    });

    app.listen(port, function () {
        console.log('Example app listening on port: ' + port);
    });


});

function updateWeatherData(key, location) {
    request('https://api.forecast.io/forecast/' + key + '/' + location, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            userData.weather = body;
        } else { console.log("API call to weather not working.\n" + error); }
    });
}

