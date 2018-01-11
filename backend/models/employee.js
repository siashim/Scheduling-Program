/*
    Class for employees
*/


function Employee(id,name,pass,schedule) {
    this.id = id;    
    this.name = name;
    this.pass = pass;
    this.schedule = schedule;
}


Employee.prototype.scheduleMeeting = function(day) {
    // will have to query database before this
    // then update from own schedule
    console.log(day);
}


Employee.prototype.outputInfo = function() {
    console.log('Name ',this.name)
    console.log('Password',this.pass)
}


module.exports = Employee;

