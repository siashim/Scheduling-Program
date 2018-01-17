/*
    Class for employees
*/


var Schedule = require('./schedule.js');


function Employee(name,pass,schedule) {
    this.name = name;
    this.pass = pass;
    this.schedule = schedule;
    this.admin = false;
}


Employee.prototype.scheduleMeeting = function(day) {
    // will have to query database before this
    // then update from own schedule
    console.log(day);
}


module.exports = Employee;

