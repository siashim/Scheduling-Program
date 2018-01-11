/**
 * the server
 * entry point of the program
 * requires email and pass
 */

var express = require('express');
var app = require('./backend/config')(express);

app.set('port',process.env.PORT || 8080);
app.listen(app.get('port'),function() {
    console.log('Server started on port '+app.get('port'));
});
