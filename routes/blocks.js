var express = require('express');
//Returns a router instance which can be mounted as a middleware
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Spin around its axis'
};
//THE ROOT PATH RELATIVE TO WHERE IT'S MOUNTED(IT USED TO BE /BLOCKS WHEN IT WAS IN APP.JS)
router.route('/')
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
router.route('/:name')
    //The same that runs for all routes which used to be in app.param
    .all(function(request, response, next){
        var name = request.params.name;
        var block = name;//name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.blockName = block;
        next();
    })
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

//exports the router as a Node module
module.exports = router;