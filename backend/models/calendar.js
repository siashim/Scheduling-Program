/*
    Calendar object class
*/


function Calendar() {
    this.init(0);
}


Calendar.prototype.init = function(employees) {
    this.date = new Date();
    this.employees = employees;
    this.hours_per_day = 12;
    this.elements = [];
}


Calendar.prototype.generateCalendar = function(schedules) {
    // TODO update employee schedule
    //      offset of date between calendar and schedule
    var len = schedules.length;
    this.init(len);
    for (var i = 0; i < len; ++i) {
        var hours = schedules[i].length;
        for (var j = 0; j < hours; ++j) {
            this.matrix[i*len+j] = schedules[i][j];
        }
    }
}

