//Requires the library
var express = require('express');
//Gets an instance of the express library
var app = express();

//Configure a route with HTTP GET method
app.get('/', function (request, response) {
    //sends back server response
    response.send('Hello World');
});

//Binds application to TCP port, it also listens for when the application is ready
app.listen(3000, function () {
    console.log('Listening on port 3000');
});

/* Testing this in a console with CURL

 curl http://localhost:3000
 Hello World

 Express extends Node HTTP Objects (Request, Response)
 For example:

 response.write('Hello World')
 response.end()

 (from Node HTTP)

 Is the same as:
 response.send('Hello World'); using express API
 */

/* The SEND function converts Objects and Arrays to JSON*/
app.get('/blocks', function (request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
    //The function below is the same as above, but a little bit better if you only want to respond JSON content
    //response.json(blocks);
});

/* Test this with: curl -i http://localhost:3000/blocks
 The -i option tells curl to also print the headers of the request
 */

/* The SEND also converts strings to HTML*/
app.get('/blocks-html', function (request, response) {
    var blocks = '<ul><li>Fixed</li><li>Moveable</li><li>Rotating</li></ul>';
    response.send(blocks);
    //The function below is the same as above, but a little bit better if you only want to respond JSON content
    //response.json(blocks);
});

/* The REDIRECT function can be used to navigate to other routes in your application. It sets the 302 MOVED
 TEMPORARILY header*/
app.get('/blocks-redir', function (request, response) {
    //response.redirect('/blocks');
    //if a redirect is fixed, we can set the status code as the first param of the redirect function
    response.redirect(301, '/blocks');
});