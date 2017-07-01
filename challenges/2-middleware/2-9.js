/*
In this exercise, it's clear that it's being used as a firewall. It bears a lot of resemblance with Servlet Filters.
(Java) / interceptors, etc.
 */
module.exports = function (request, response, next) {
    if (request.method === 'GET') {
        next();
    } else {
        response.send('Method is not allowed');
    }
};