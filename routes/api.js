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

router.get('/meeting/rooms', controller.findAll_rooms);
router.get('/meeting/employees', controller.findAll_employees);
router.post('/meeting/event', controller.createOne_meeting);
router.post('/meeting/selectedEvents', controller.findAll_selectedEvents);

router.post('/login', controller.findOne_login);

router.get('/home/meetings/:id', controller.findAll_meetings);
router.get('/home/reminders/:id', controller.findAll_reminders);
router.delete('/home/reminders/:id', controller.deleteOne_reminder);
router.get('/home/notifications/:id', controller.findAll_notifications);
router.put('/home/notification/:id', controller.updateOne_notification);

router.post('/profile/details', controller.findOne_profile);
router.put('/profile/details/:id', controller.updateOne_profile);
// router.put('/profile/available', controller.updateOne_available);

module.exports = router;