/*
 Rich Javascript applications can use middleware to update parts of the web page with AJAX
 */
var express = require('express');
var app = express();
//./ means it's a local module, not an NPM one
var logger = require('./logger');

/*app.get('/', function (request, response) {
 //__dirname is the directory of the application
 response.sendFile(__dirname + '/public/index.html');
 });*/

//You can define a public directory to serve static files by using use with express.static
//It will default to index.html file
app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));

//Add our logger to the stack of middlewares
app.use(logger);

app.listen(3000, function () {
    console.log('Running express on port 3000');
});

app.get('/blocks', function (request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

/*

 MIDDLEWARES in express are a sequence of functions that are always called sequentially, before responding to the client.
 This response can either be from a route, as in app.get, or from a middleware, app.use. These functions have a REQUEST,
 RESPONSE and NEXT parameters, the latter being the next middleware to be executed.
 Actually, express.static IS THE ONLY middleware available in express.

app.use(function (request, response, next) {
    //you have to call next to keep the chain going
    next();
});

app.use(function (request, response, next) {
    //you have to call next to keep the chain going
    next();
});

app.use(function (request, response, next) {
    //you have to call next to keep the chain going
    response.send('Done!');
    //The next line will not run because response has already returned to the client
    next();
});

*/
