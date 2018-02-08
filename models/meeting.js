var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
   owner: String, 
   subject: String,
   room: String,
   startDate: Date,
   endDate: Date,
   attendees: []
});

var Meeting = mongoose.model('Meeting', meetingSchema, 'meeting');

module.exports = Meeting;