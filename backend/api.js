/*
    backend routing system
*/


var express = require('express');
var app = express.Router();
var path = require('path');
var view_filepath = '../frontend/views/';

var Employee = require('./models/employee.js');


//var mongodb = require('./db.js');


var Database = require('./db.js');


app.get('/',function(req,res,next) {
    res.render(view_filepath+'home.ejs');
});


app.get('/calendar',function(req,res,next) {

    var database = new Database('scheduling');

    var employee = new Employee('0000','John Smith','password','');
    var obj = employee.output();
    //database.test();
    //console.log(obj);
    //database.insert('employees',obj);

    database.insert('employee',obj);

    res.render(view_filepath+'calendar.ejs');
});


app.get('/rooms',function(req,res,next){
    res.render(view_filepath+'rooms.ejs');
});


app.get('/settings',function(req,res,next){
    res.render(view_filepath+'settings.ejs');
});


module.exports = app;

