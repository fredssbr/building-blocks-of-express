var express = require('express');
var app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));

var blocks = require('./routes/blocks');
//Router is mounted in a particular root url
app.use('/blocks', blocks);

app.listen(3000, function () {
    console.log('Running express on port 3000');
});
