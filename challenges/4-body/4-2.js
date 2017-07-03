var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

app.post('/cities', parseUrlEncoded, function (request, response) {
    var city = request.body;
    createCity(city.name, city.description);
    response.status(201).json(city.name);
});

app.listen(3000);

var createCity = function (name, description) {
    cities[name] = description;
    return name;
};
