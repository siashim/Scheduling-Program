/*
    backend routing system
*/

var express = require('express');
var app = express.Router();
var path = require('path');
var view_filepath = '../frontend/views/';

var Database = require('./db.js');
var Employee = require('./models/employee.js');
var Schedule = require('./models/schedule.js');

var db = new Database('scheduling');


app.get('/',function(req,res,next) {
    res.render(view_filepath+'home.html');
});


app.get('/calendar',function(req,res,next) {

    /*
    var schedule = new Schedule();
    var employee = new Employee('Super Joe','monkey',schedule);
    db.insert('employee',employee)
        .then(function(entries) {
            console.log(entries);
        })
        .catch(function(err) {
            console.log(err);
        });
    */

    
    

    res.render(view_filepath+'calendar.html');
});


app.get('/rooms',function(req,res,next){
    res.render(view_filepath+'rooms.html');
});


app.get('/settings',function(req,res,next){
    res.render(view_filepath+'settings.html');
});


module.exports = app;

