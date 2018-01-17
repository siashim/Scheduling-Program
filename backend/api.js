/*
    backend routing system
*/


var express = require('express');
var app = express.Router();
var path = require('path');
var view_filepath = '../frontend/views/';

var Database = require('./db.js');
var db = new Database('scheduling');

var Employee = require('./models/employee.js');


app.get('/',function(req,res,next) {
    res.render(view_filepath+'home.ejs');
});


app.get('/calendar',function(req,res,next) {

    db.query('employee').then(function(res) {
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    });
        
    res.render(view_filepath+'calendar.ejs');
});


app.get('/rooms',function(req,res,next){
    res.render(view_filepath+'rooms.ejs');
});


app.get('/settings',function(req,res,next){
    res.render(view_filepath+'settings.ejs');
});


module.exports = app;

