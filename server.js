/*
  the server
  entry point of the program
*/

var express = require('express');
var app = require('./util/config')(express);

app.set('port',process.env.PORT || 7001);
app.listen(app.get('port'),function() {
  console.log('Server started on port '+app.get('port'));
});

