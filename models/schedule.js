function Schedule(id) {
    this.grid = null;
	this.employeeID = id;
	var daysMax = 14;
	var hoursMax = 12;
	this.daysHoursArray = new Array();

	for (var i=0;i< daysMax;i++) {
		this.daysHoursArray[i] = new Array();
		for (var j=0;j< hoursMax;j++) {
			this.daysHoursArray[i][j] = 0;
		}
	}
}
Schedule.prototype.SetVisibility = function(day, hour) {
	this.daysHoursArray[day][hour] = 1;
}
Schedule.prototype.RespondToInvite = function()  {
}

var schedule = new Schedule(1234);

console.log(schedule.daysHoursArray);

