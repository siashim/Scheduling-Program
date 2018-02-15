

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var attendanceSchema = new Schema({
    MeetingId: String,
    EmployeeId: String,
    Status: Number
});


var Attendance = mongoose.model('Attendance', attendanceSchema, 'attendance');
module.exports = Attendance;

