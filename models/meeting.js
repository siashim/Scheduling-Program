var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
   ownerFirst: String,
   ownerLast: String,
   ownerID: String,
   subject: String,
   room: String,
   startDate: Date,
   endDate: Date,
   attendees: Array
});

var Meeting = mongoose.model('Meeting', meetingSchema, 'meeting');
module.exports = Meeting;
