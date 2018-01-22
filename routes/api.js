// The backend routing system:
// receives $http requests from frontend angular router
// sends res.send(...) responses back to angular router

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express();
var Employee = require('../models/employee.js');
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

module.exports = router;