var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
        Events: []
});

var Schedule = mongoose.model('Schedule', scheduleSchema, 'schedule');

module.exports = Schedule;