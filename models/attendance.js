

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var attendanceSchema = new Schema({
    MeetingId: { type: Schema.Types.ObjectId, ref: 'Meeting' },
    EmployeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    Status: Number
});


var Attendance = mongoose.model('Attendance', attendanceSchema, 'attendance');
module.exports = Attendance;

