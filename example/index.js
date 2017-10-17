/**
 * Defines ExpressJS example app
 */
'use strict';

var express = require('express');
var app = express();

app.use('/dist', express.static('dist'));
app.use('/src', express.static('src'));
app.use('/node_modules', express.static('node_modules'));
app.set('view engine', 'pug');
app.set('views', './');

app.get("/", function(request, response) {
    response.render("index");

});

var port = 3000;
var address = "127.0.0.1";
app.listen(port, address, function () {
    console.log('Listening at http://%s:%s', address, port);
});
