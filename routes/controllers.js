

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

// Find one login
exports.findOne_login = function(req, res){   
   // TODO: implement find in db...
   var list = [
      {
         FirstName: 'Test',
         LastName: 'Admin',
         EmployeeId: 'admin',
         Password: 'admin',
         Position: 'admin',
      },
      {
         FirstName: 'Regular',
         LastName: 'User',
         EmployeeId: 'user',
         Password: 'user',
         Position: 'SW Developer',
      },
      {
         FirstName: 'Ana',
         LastName: 'Alpha',
         EmployeeId: 'a100',
         Password: 'a100',
         Position: 'admin',
      },
   ]

   var data = {
      empId: '',
      firstName: '',
      lastName: '',
      isLoggedIn: false, 
      isAuthorized: false,
      welcome: '',
      errorMsg: 'Password incorrect.'
   };
   for(var i=0; i<list.length; i++){
      if (req.body.username === list[i].EmployeeId && req.body.password === list[i].Password){
         data = {
            empId: list[i].EmployeeId,
            firstName: list[i].FirstName,
            lastName: list[i].LastName,
            isLoggedIn: true, 
            isAuthorized: (list[i].Position === 'admin'),
            welcome: 'Welcome, ' + list[i].FirstName + ' ' + list[i].LastName,
            errorMsg: ''
         }
         return res.send(data);
      }
   }

   return (res.send(data));
}

// Find all reminders
exports.findAll_reminders = function(req, res){
   var empToSearch = req.params.id;

   // TODO: this should be the result of a db query ... 
   var reminders = [
      {
         _id: '12345678',
         owner: 'a100100', 
         subject: 'Meeting 1',
         room: '121',
         startDate: Date.now(),
         endDate: Date.now() + (1*60*60*1000),
         attendees: ['aa','bb','cc'],
      },
      {
         _id: '12345679',
         owner: 'a100100', 
         subject: 'Meeting 2',
         room: '221',
         startDate: Date.now() + (3*60*60*1000),
         endDate: Date.now() + (4*60*60*1000),
         attendees: ['dd','ee','ff'],
      },
   ]

   return res.send(reminders);
}

// Delete one reminder
exports.deleteOne_reminder = function(req, res){
   var id = req.params.id;
   console.log('TODO: findByIdAndRemove meeting ' + id);

   res.sendStatus(200);
}

// Find all notifications
exports.findAll_notifications = function(req, res){
   var empToSearch = req.params.id;

   // TODO: this should be the result of a db query ... 
   // -> meetings where user is on invite list
   //    -> meetings where user has not responded yet (response = 0) 

   var notifications = [
      {
         _id: '10000000',
         requester: 'Boss',
         subject: 'Daily Scrum',
         date: 'Mon 1/15/2018',
         time: '10:00 AM',
         room: '121',
         response: 0
      },
      {
         _id: '10000001',
         requester: 'Director',
         subject: 'Project planning session',
         date: 'Mon 1/15/2018',
         time: '3:00 PM',
         room: 'Bldg. 8 Room 102',
         response: 0
      },      
      {
         _id: '10000002',
         requester: 'CEO',
         subject: 'All hands meeting',
         date: 'Mon 1/16/2018',
         time: '3:00 PM',
         room: '100',
         response: 0
      },
      {
         _id: '10000003',
         requester: 'Boss',
         subject: 'Daily Scrum',
         date: 'Mon 1/16/2018',
         time: '10:00 AM',
         room: '121',
         response: 0
      },
   ]

   res.send(notifications);
}

// Update one notification
exports.updateOne_notification = function(req, res){
   var id = req.params.id;
   var update = req.body.response;
   console.log('Notification updated: '+ id + ' to ' + update);

   // TODO: update notification accept/decline in db
   
   return res.send({value: update});
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