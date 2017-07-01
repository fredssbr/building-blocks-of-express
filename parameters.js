var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));

/*
 QUERY STRINGS are great to limit the number of items returned
 curl http://localhost:3000/blocks?limit=1
 */
app.get('/blocks', function (request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if (request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }
});

/*
 DYNAMIC ROUTES use path params to create meaningful urls
 curl -i http://localhost:3000/blocks/Fixed

 When the description is not found, the proper way to handle it is to send a 404 response status (NOT FOUND) and a
 proper message. No description found for <parameter>.
 */
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Spin around its axis'
};
app.get('/blocks/:name', function (request, response) {
    //you can access the path param from request.params.<<name>>
    var description = blocks[request.params.name];
    if(!description){
        response.status(404).json('No description found for ' + request.params.name)
    }else{
        response.json(description);
    }
});

app.listen(3000, function () {
    console.log('Running express on port 3000');
});

