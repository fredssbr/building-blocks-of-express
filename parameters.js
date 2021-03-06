var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Spin around its axis'
};

/*
 QUERY STRINGS are great to limit the number of items returned
 curl http://localhost:3000/blocks?limit=1
 */
app.get('/blocks', function (request, response) {
    if (request.query.limit >= 0) {
        //Return the name of the properties with Object.keys
        response.json(Object.keys(blocks.slice(0, request.query.limit)));
    } else {
        response.json(Object.keys(blocks));
    }
});

/*
 DYNAMIC ROUTES use path params to create meaningful urls
 curl -i http://localhost:3000/blocks/Fixed

 When the description is not found, the proper way to handle it is to send a 404 response status (NOT FOUND) and a
 proper message. No description found for <parameter>.
 */
app.get('/blocks/:name', function (request, response) {
    //you can access the path param from request.params.<<name>>
    var description = blocks[request.blockName];
    if(!description){
        response.status(404).json('No description found for ' + request.params.name)
    }else{
        response.json(description);
    }
});

/*
The code above would not find anything with fixed, mOvAblE, etc because of the letter case.
There's a way to intercept all name parameters to treat them before reaching any routes.
The aoo.param function maps placeholders to callback functions, which is really useful for running pre-conditions
on dynamic routes. Middleware function!
*/
app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block;
    next();
});

/*
Parsing form data depends on a middleware that is not shipped with express BODY-PARSER
*/
var bodyParser = require('body-parser');
//Forces the use of native querystring NodeJS library
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

/*
Routes can take multiple handlers as arguments and will call them sequentially.
Using multiple route handlers is useful for re-using middleware that loads resources, perform validation, authentication
etc.
 */
app.post('/blocks', parseUrlEncoded, function(request, response){
    /*
     REQUEST.BODY has form data submitted
     Each element of the form becomes a property in the body object
     */
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    //HTTP 201 Status - Created
    response.status(201).json(newBlock.name);
});

app.delete('/blocks/:name', function(request, response){
    delete blocks[request.blockName];
    //The sendStatus function also sets the body to OK because some browsers or frameworks in JS can't handle an empty
    //response body very well
    response.sendStatus(200);
});


app.listen(3000, function () {
    console.log('Running express on port 3000');
});


