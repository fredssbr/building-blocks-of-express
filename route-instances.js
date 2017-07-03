var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Spin around its axis'
};

/*
In order to avoid duplication in route names, we can use app.route to create route instances.
It takes the path of the routes and returns the route object, so that we can chain routes
 */
app.route('/blocks')
    .get(function (request, response) {
        if (request.query.limit >= 0) {
            response.json(Object.keys(blocks.slice(0, request.query.limit)));
        } else {
            response.json(Object.keys(blocks));
        }
    })
    .post(parseUrlEncoded, function(request, response){
        var newBlock = request.body;
        blocks[newBlock.name] = newBlock.description;
        response.status(201).json(newBlock.name);
    });

app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.blockName = block;
    next();
});

app.route('/blocks/:name')
    .get(function (request, response) {
        var description = blocks[request.blockName];
        if(!description){
            response.status(404).json('No description found for ' + request.params.name)
        }else{
            response.json(description);
        }
    })
    .delete(function(request, response){
        delete blocks[request.blockName];
        response.sendStatus(200);
    });

app.listen(3000, function () {
    console.log('Running express on port 3000');
});
