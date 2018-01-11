/*
    backend routing system
*/


var express = require('express');
var app = express.Router();
var path = require('path');

var view_filepath = '../frontend/views/';


app.get('/',function(req,res,next) {
    res.render(view_filepath+'home.ejs')
});


module.exports = app;

