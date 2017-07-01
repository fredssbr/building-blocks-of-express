/*
We assign our logger function to module.exports in order to export it as a Node module and make it accessible from other
files. The Node module system follows the CommonJS specification.
 */
module.exports = function(request, response, next){
    //+ sign converts the Date object to milliseconds
    var start = +new Date();
    //Standard out is a writable stream
    var stream = process.stdout;

    var url = request.url;
    var method = request.method;

    //The response object is an EventEmitter which we can use to listen to events
    response.on('finish', function(){
       var duration = +new Date() - start;
       var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
       stream.write(message);
    });

    next();
}