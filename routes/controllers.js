


var Employee = require('../models/employee.js');
var Room = require('../models/room.js');
var Meeting = require('../models/meeting.js');
var Schedule = require('../models/schedule.js');
var Attendance = require('../models/attendance.js');


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

   var meeting = new Meeting(req.body);
   function invite(mtg,atts) {
      return new Attendance({
         MeetingId: mtg.id,
         EmployeeId: atts,
         Status: 0
      });
   }

   meeting.save(function(err, mtg) {
      if (err) { return res.send(500,err); }
      var atts = req.body.attendees;
      var attendance = atts.map(x => invite(mtg,x));
      Attendance.collection.insert(attendance, function(errs, docs) {
         if (errs) { return res.send(500,errs); }
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
      console.log('\n\n\n','ATTENDANCES',atts,'\n\n\n');
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

   notificatonFilter(req.query.mid,1,res);    

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
         { $set: { Status: -2 }},
         { multi: true },
         function(errs) {
            if (errs) { return res.send(500,errs); }
            return res.send(200);
         });
      
      /*
      Attendance.findOneAndUpdate({ 
         MeetingId: mtgId,
         EmployeeId: empId
      },{ Status: -2 }, { new: true }, 
        function(err, doc) {
           if (err) { return res.send(500,err); }
           console.log('ATTENDANCE FIND AND UPDATE',doc);
           return res.send(doc);
        });
        */
   });

}

// Find all notifications
exports.findAll_notifications = function(req, res){
   notificatonFilter(req.query.mid,0,res);
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
   var empToSearch = req.params.id;
   console.log('Getting notifications for: ' + empToSearch);

   // TODO: this should be the result of a db query
   // -> All meetings that user is owner or invitee
   // -> All meetings in range today to two weeks
   // -> All meetings that response is none/accept {0,1}
   var hrs = (60*60*1000);
   var days = (24*60*60*1000);
   var response_1 = "#46EE00";
   var response_0 = "#C0C0C0";
   var meetings = [
      {
         start: Date.now() + 0*days + 1*hrs,
         end: Date.now() + 0*days + 2*hrs,
         id: "1",
         text: "Daily Scrum",
         backColor: response_1,
      },
      {
         start: Date.now() + 1*days + 1*hrs,
         end: Date.now() + 1*days + 2*hrs,
         id: "2",
         text: "Daily Scrum",
         backColor: response_1,
      },
      {
         start: Date.now() + 2*days + 1*hrs,
         end: Date.now() + 2*days + 2*hrs,
         id: "3",
         text: "Daily Scrum",
         backColor: response_1,
      },
      {
         start:  Date.now() + 3*days + 1*hrs,
         end:  Date.now() + 3*days + 2*hrs,
         id: "4",
         text: "Daily Scrum",
         backColor: response_1,
      },
      {
         start:  Date.now() + 7*days + 1*hrs,
         end:  Date.now() + 7*days + 2*hrs,
         id: "5",
         text: "Team Meeting",
         response: 0,
         backColor: response_0,
      },
      {
         start: Date.now() + 14*days + 1*hrs,
         end:  Date.now() + 14*days + 2*hrs,
         id: "6",
         text: "Weekly Review",
         backColor: response_0,
      },
   ];

   res.send(meetings);
}


