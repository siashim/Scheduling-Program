

var Employee = require('../models/employee.js');
var Room = require('../models/room.js');
var Meeting = require('../models/meeting.js');
var Schedule = require('../models/schedule.js');
var Attendance = require('../models/attendance.js');


var REPLY = Object.freeze({
    ACCEPT: 1,
    NEUTRAL: 0,
    DECLINE: -1,
    CANCEL: -2
});


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
   // console.log('id: ' + req.params.id);
   // console.log('body: ' + JSON.stringify(req.body));
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
   
   // TODO update validation
   var query = {
      Owner : { $exists: true, $ne: null },
      Room : { $exists: true, $ne: null },
      Dates : { $exists: true, $ne: null },
      Duration : { $exists: true, $ne: null },
      Attendees : { $exists: true, $ne: null },
   }

   console.log('find all meeting controller',req.body);

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
exports.createOne_meeting = function(req, res) {

   function invite(mtg,atts) {
      var response = atts == mtg.ownerID ? 
         REPLY.ACCEPT : REPLY.NEUTRAL;
      return new Attendance({
         MeetingId: mtg.id,
         EmployeeId: atts,
         Status: response
      });
   }
console.log('Body: '+JSON.stringify(req.body));
   var meeting = new Meeting(req.body);
   console.log('Meeting '+ meeting);
   meeting.save(function(err, mtg) {
      if (err) { return res.send(500,err); }
      var atts = req.body.attendees;
      var attendance = atts.map(x => invite(mtg,x));
      Attendance.collection.insert(attendance, function(errs, docs) {
         if (errs) { console.log('Error: '+err); return res.send(500,errs); }
         return res.send(docs);
      });
            
   });

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

// Find one login
exports.findOne_login = function(req, res){   
   var pwd = req.body.password;
   var query = { EmployeeId: req.body.username }
   var data = {
      empId: '',
      firstName: '',
      lastName: '',
      isLoggedIn: false, 
      isAuthorized: false,
      welcome: '',
      errorMsg: 'Password incorrect.',
      mid: ''
   };

   // Unlock full access. (DEV ONLY)
   if( req.body.username === 'admin' && req.body.password === 'admin'){
      var AdminData = {
         empId: 'admin',
         firstName: 'Admin',
         lastName: 'Admin',
         isLoggedIn: true, 
         isAuthorized: true,
         welcome: 'Welcome, admin admin',
         errorMsg: ''
      };
      return res.send(AdminData);
   }

   Employee.findOne(query)
   .exec(function(err, result){
      if(err){ return res.send(500, err); }
      if( result != null && result.Password === req.body.password){
         data.empId = result.EmployeeId;
         data.firstName = result.FirstName;
         data.lastName = result.LastName;
         data.isLoggedIn = true; 
         data.isAuthorized = (result.Position.toLowerCase() === 'admin');
         data.welcome = 'Welcome, ' + result.FirstName + ' ' + result.LastName;
         data.errorMsg = '';
         data.mid = result._id;
         return res.send(data)
      }
      
      return res.send(data);
   })
}


// A WORKING EXAMPLE!
function notificatonFilter(id,status,res) {

   function assign(meeting,rooms) {
      var room = rooms.find(x => meeting.room == x._id) || { Number: '' };
      return {
         _id: meeting._id,
         ownerFirst: meeting.ownerFirst,
         ownerLast: meeting.ownerLast,
         subject: meeting.subject,
         startDate: meeting.startDate,
         endDate: meeting.startDate,
         room: room.Number
      };
   }

   Attendance.find({
      EmployeeId: id,
      Status: status
   })
   .then(function(atts) {
      var attending = atts.map(x => x.MeetingId);
      Meeting.find({ '_id': { $in: attending } })
      .then(function(mtgs) {
         var roomIDs = mtgs.map(x => x.room).filter(x => x != '');
         Room.find({ '_id': { $in: roomIDs } })
         .then(function(rooms) {
            var notices = mtgs.map(x => assign(x,rooms));
            return res.send(notices);
         });
      });
   })
   .catch(function(err){ return res.send(500,err); });

}

// Find all reminders
exports.findAll_reminders = function(req, res){
   notificatonFilter(req.query.mid,REPLY.ACCEPT,res);    
}


// Delete one reminder
exports.deleteOne_reminder = function(req, res){
   
   var empId = req.query.empId;
   var mtgId = req.query.id;
   Meeting.findById(mtgId,function(err,mtg) {
      if (err) { return res.send(500,err); }
      var query = { MeetingId: mtgId };
      if (mtg.ownerID != empId)
         query.EmployeeId = empId;      
      Attendance.update(query,
         { $set: { Status: REPLY.CANCEL }},
         { multi: true },
         function(errs) {
            if (errs) { return res.send(500,errs); }
            return res.send(200);
         });
   });

}

// Find all notifications
exports.findAll_notifications = function(req, res){
   notificatonFilter(req.query.mid,REPLY.NEUTRAL,res);
}

// Update one notification
exports.updateOne_notification = function(req, res){

   var update = req.body.response;
   Attendance.findOneAndUpdate({
      MeetingId: req.body._id,
      EmployeeId: req.body.mid
   }, { Status: req.body.status }, { new: true }, 
      function(err,docs) {
         if (err) { return res.send(500,err); }
         // TODO something other than this should be returned?
         return res.send({value: update});
   });
   
}


// Find all meetings
exports.findAll_meetings = function(req, res){

   var accpt_clr = "#46EE00";
   var pnd_clr = "#C0C0C0";

   function shape(mtg,atts) {
      var attrib = atts.find(x => x.MeetingId == mtg._id) || { Status: 0 };
      var backColor = attrib.Status == REPLY.ACCEPT ? accpt_clr : pnd_clr;
      return {
         start: mtg.startDate,
         end: mtg.endDate,
         id: mtg.subject,
         text: mtg.subject,
         backColor: backColor
      };
   }

   var mid = req.query.mid;
   Attendance.find({
      EmployeeId: mid,
      $or: [
         { Status: REPLY.NEUTRAL },
         { Status: REPLY.ACCEPT }
      ]
   })
   .exec(function(err,atts) {
      if (err) { return res.send(500,err); }
      var attending = atts.map(x => x.MeetingId);
      Meeting.find({'_id':{ $in: attending }})
      .exec(function(err,mtgs) {
         var dsp = mtgs.map(x => shape(x,atts));
         return res.send(dsp);
      });
   });

}

// Find all events that are scheduled on given date, and return those events
exports.findAll_selectedEvents = function(req, res){

   d = new Date(req.body.date);
   console.log('SelEventDates: '+d.toLocaleString());
   // console.log('SelEventEmps: '+JSON.stringify(req.body.employees));
   // console.log('SelEventRms: '+JSON.stringify(req.body.rooms));
   
   // TODO: improve this function to return 2 arrays of events: 
   // 1. a Meeting array for the req.body.employees on date req.body.date
   // 2. a Meeting array containing the req.body.rooms on date req.body.date
   
   var thisDate = new Date(req.body.date).setHours(0,0,0,0);
   var nextDate = new Date(req.body.date).setHours(24,0,0,0);

   var employees = req.body.employees;
   var rooms = req.body.rooms;
   var employeeIDs = employees.map(x => x._id);
   var roomIDs = rooms.map(x => x._id);

   var conditions = {
      path: 'MeetingId',
      match: { 
         startDate: { $gte: thisDate }, 
         endDate: { $lte: nextDate },
      }
   };

   Meeting.find({
      room: { $in: roomIDs },
      startDate: { $gte: thisDate },
      endDate: { $lte: nextDate }
   })
   .populate({ path: 'room' })
   .exec(function(err,roomMtgs) {
      if (err) { return res.send(500,err); }

      Attendance.find({ 
         EmployeeId: { $in: employeeIDs }
      })
      .populate(conditions)
      .exec(function(err,empMtgs) {
         if (err) { return res.send(500,err); }

         console.log('ROOM MTGS',roomMtgs);
         console.log('EMPLOYEE MTGS',empMtgs);

         empMtgs = empMtgs.filter(x => x.MeetingId);
         roomMtgs = roomMtgs.filter(x => x.room);


         //roomMtgs = roomMtgs.filter(function(item))

         var results = {
            employees: empMtgs,
            rooms: roomMtgs
         };


         return res.send(results);

      });


   });

   /*

   Attendance.find().populate(conditions).exec(function(err, result){
      if(err){return console.log(err)};
      //console.log('attendance query',result);
      result = result.filter(function(item){
         return item.MeetingId;
      })
      //console.log('attendance filter',result);
      return res.send(result);
   });

   */

}

