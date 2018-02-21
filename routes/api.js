// The backend routing system:
// receives $http requests from frontend angular router
// sends res.send(...) responses back to angular router

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express();
var controller = require('./controllers.js');

// Use middleware
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// All create, Read, Update, Destroy
router.get('/admin/employees', controller.findAll_employees);
router.get('/admin/employees/:id', controller.findOne_employee);
router.post('/admin/employees', controller.createOne_employee);
router.put('/admin/employees/:id', controller.updateOne_employee);
router.delete('/admin/employees/:id', controller.deleteOne_employee);
router.get('/admin/rooms', controller.findAll_rooms);
router.get('/admin/rooms/:id', controller.findOne_room);
router.post('/admin/rooms', controller.createOne_room);
router.put('/admin/rooms/:id', controller.updateOne_room);
router.delete('/admin/rooms/:id', controller.deleteOne_room);

// router.get('/admin/meeting', controller.findAll_rooms);
// router.get('/admin/meeting/:id', controller.findOne_room);
// router.post('/admin/meeting', controller.createOne_room);
// router.put('/admin/meeting/:id', controller.updateOne_room);
// router.delete('/admin/meeting/:id', controller.deleteOne_room);
// router.get('/admin/schedule', controller.findAll_rooms);
// router.get('/admin/schedule/:id', controller.findOne_room);
// router.post('/admin/schedule', controller.createOne_room);
// router.put('/admin/schedule/:id', controller.updateOne_room);
// router.delete('/admin/schedule/:id', controller.deleteOne_room);

router.get('/meeting/rooms', controller.findAll_rooms);
router.get('/meeting/employees', controller.findAll_employees);
router.post('/meeting/event', controller.createOne_meeting);
router.post('/login', controller.findOne_login);
router.get('/home/reminders/:id', controller.findAll_reminders);
router.delete('/home/reminders/:id', controller.deleteOne_reminder);
router.get('/home/notifications/:id', controller.findAll_notifications);
router.put('/home/notification/:id', controller.updateOne_notification)
router.get('/home/meetings/:id', controller.findAll_meetings);
router.post('/meeting/selRoomEvents', controller.findAll_eventRooms);

module.exports = router;