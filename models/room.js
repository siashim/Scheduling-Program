var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
   Number: String,
   Capacity: String
});

var Room = mongoose.model('Room', roomSchema, 'room');

module.exports = Room;