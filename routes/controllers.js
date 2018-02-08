

//var Database = require('../util/db.js');
//var db = new Database('meeting');


var Employee = require('../models/employee.js');
var Room = require('../models/room.js');
var Meeting = require('../models/meeting.js');
var Schedule = require('../models/schedule.js');

// Find all employees in db
exports.findAll_employees = function(req, res) {
    // Query validation: ensures returned reports have minimum set of required fields  
    var query = {
        FirstName : { $exists: true, $ne: null },
        LastName : { $exists: true, $ne: null },
        EmployeeId : { $exists: true, $ne: null },
    }

    Employee.find(query)
    .select({ Password: 0}) // Purposely prevent sending all pwds to frontend
    .exec(function(err, result){
        if(err){ return res.send(500, err); }
        return res.send(result)
    })
}

// Find one employee
exports.findOne_employee = function(req, res){
   var id = {_id: req.params.id};
   Employee.findById(id, function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result);
   })
}

// Create one employee
exports.createOne_employee = function(req, res){
   var employee = new Employee(req.body);
   employee.save(function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Update one employee
exports.updateOne_employee = function(req, res){
   var id = { _id: req.params.id };
   var update = {
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      EmployeeId: req.body.employeeid,
      Password: req.body.password,
      Position: req.body.position,
   }
   Employee.findByIdAndUpdate(id, {$set:update}, function(err, result){
      if(err){ return res.send(500); }
      return res.send(result);
   })
}

// Delete one employee
exports.deleteOne_employee = function(req, res){
   Employee.findByIdAndRemove(req.params.id, function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Find all rooms
exports.findAll_rooms = function(req, res){
   // Query validation: ensures returned reports have minimum set of required fields  
   var query = {
       Number : { $exists: true, $ne: null },
       Capacity : { $exists: true, $ne: null },
   }

   Room.find(query)
   .exec(function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result)
   })
}

// Find one room
exports.findOne_room = function(req, res){
   var id = {_id: req.params.id};
   Room.findById(id, function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result);
   })
}

// Create one room
exports.createOne_room = function(req, res){
   var room = new Room(req.body);
   room.save(function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Update one room
exports.updateOne_room = function(req, res){
   console.log('id: ' + req.params.id);
   console.log('body: ' + JSON.stringify(req.body));
   var id = { _id: req.params.id };
   var update = {
      Number: req.body.number,
      Capacity: req.body.capacity,
   }
   Room.findByIdAndUpdate(id, {$set:update}, function(err, result){
      if(err){ return res.send(500); }
      return res.send(result);
   })
}

// Delete one room
exports.deleteOne_room = function(req, res){
   Room.findByIdAndRemove(req.params.id, function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

exports.findAll_meeting = function(req, res) {
   // Query validation: ensures returned reports have minimum set of required fields  
   var query = {
      Owner : { $exists: true, $ne: null },
      Room : { $exists: true, $ne: null },
      Dates : { $exists: true, $ne: null },
		Duration : { $exists: true, $ne: null },
      Attendees : { $exists: true, $ne: null },
   }

    Meeting.find(query)
    .exec(function(err, result){
        if(err){ return res.send(500, err); }
        return res.send(result)
    })
}

// Find one meeting
exports.findOne_meeting = function(req, res){
   var id = {_id: req.params.id};
   MeetingById(id, function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result);
   })
}

// Create one meeting
exports.createOne_meeting = function(req, res){
   var meeting = new Meeting(req.body);
   meeting.save(function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Update one meeting
exports.updateOne_meeting = function(req, res){
   var id = { _id: req.params.id };
   var update = {
      Owner: req.body.owner,
      Room: req.body.room,
      Dates: req.body.dates,
      Duration: req.body.duration,
	  attendees: req.body.attendees,
   }
   Meeting.findByIdAndUpdate(id, {$set:update}, function(err, result){
      if(err){ return res.send(500); }
      return res.send(result);
   })
}

// Delete one meeting
exports.deleteOne_meeting = function(req, res){
   Meeting.findByIdAndRemove(req.params.id, function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Find all schedules
exports.findAll_schedule = function(req, res){
   // Query validation: ensures returned reports have minimum set of required fields  
   var query = {
       Events : { $exists: true, $ne: null },
   }

   Schedule.find(query)
   .exec(function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result)
   })
}

// Find one schedule
exports.findOne_schedule = function(req, res){
   var id = {_id: req.params.id};
   Schedule.findById(id, function(err, result){
      if(err){ return res.send(500, err); }
      return res.send(result);
   })
}

// Create one schedule
exports.createOne_schedule = function(req, res){
   var schedule = new Schedule(req.body);
   schedule.save(function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}

// Update one schedule
exports.updateOne_schedule = function(req, res){
   console.log('id: ' + req.params.id);
   console.log('body: ' + JSON.stringify(req.body));
   var id = { _id: req.params.id };
   var update = {
      Events: req.body.events,
   }
   Evetns.findByIdAndUpdate(id, {$set:update}, function(err, result){
      if(err){ return res.send(500); }
      return res.send(result);
   })
}

// Delete one schedule
exports.deleteOne_schedule = function(req, res){
   Schedule.findByIdAndRemove(req.params.id, function(err){
      if(err){ return res.send(500, err); }
      return res.sendStatus(200);
   })
}