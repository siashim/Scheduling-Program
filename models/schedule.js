var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
        Events: []
});

var Schedule = mongoose.model('Schedule', employeeSchema, 'schedule');

module.exports = Schedule;