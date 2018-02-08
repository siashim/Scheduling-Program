/*
var Meeting = function(owner, room, date, duration){
    this._owner = owner;
    this._room = room;
    this._date = date;
    this._duration = duration;
    this._attendees = [];
}

Meeting.prototype.getOwner = function(){
    return this._owner;
}
Meeting.prototype.getRoom = function(){
    return this._room;
}
Meeting.prototype.getDate = function(){
    return this._date;
}
Meeting.prototype.getDuration = function(){
    return this._duration;
}
Meeting.prototype.setAttendees = function(attendees){
    this._attendees = attendees;
}
Meeting.prototype.numAttendees = function(){
    return this._attendees.length;
}
Meeting.prototype.toString = function(){
    return this._owner + ' reserved room ' + this._room.number + '(' + this._room.capacity + ') on ' + this._date.toString() + ' for ' + this._duration + ' hours';
}*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
    Owner: String, 
    Room: String,
    Duration: String,
    Attendees: []
});
var Meeting = mongoose.model('Meeting', employeeSchema, 'Meeting');

module.exports = Meeting;
