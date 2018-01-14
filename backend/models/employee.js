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


Employee.prototype.output = function() {
    var self = this;
    return {
        id: this.id,
        name: this.name,
        pass: this.pass,
        schedule: this.schedule
    };
}


module.exports = Employee;

