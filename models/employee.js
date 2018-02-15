var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    FirstName: String, 
    LastName: String,
    EmployeeId: String,
    Password: String,
    Position: String,
    Schedule: Object
});


var Employee = mongoose.model('Employee', employeeSchema, 'employee');

module.exports = Employee;