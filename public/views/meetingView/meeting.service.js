// Helper functions for meetingCtrl
mainapp.service('meetingService', function(){
   
   // Build array of all options used in the selector dialog
   this.makeOptionsList = function(data){
      options = [];
      for (i=0; i<data.length; i++){
         options.push(data[i]);
         options[i].selected = false;
         options[i].index = i;
      }
      return options;
   }

   // Accessors:
   // Set Daypilot scheduler resource children, the table left column items
   this.setSchedulerResourcesChildren = function(list, type, prefix){
      var ary = [];
      for(i=0; i<list.length; i++){
         var element;
         if (type == 'Rooms'){
            element = {
               id: prefix + i,
               name: this.roomToString(list[i]),
            }
         }
         else if (type == 'Employees'){
            element = {
               id: prefix + i,
               name: this.employeeToString(list[i]),
            }
         }
         ary.push(element);
      }
      return ary;
   };

   // Set DayPilot scheduler resources, the table left column
   this.setSchedulerResources = function(list, type, group, prefix){
      var resource = {
         "id": group,
         "name": type,
         "expanded": true,
         "children": this.setSchedulerResourcesChildren(list, type, prefix),
      };
      return resource;
   }

   // Convert UTC time to local time
   // this.toLocaltime = function(data){
   //    var date = new Date(data);
   //    return date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
   // };




	// Convert database event format to DayPilot event format
   this.eventToSchedulerEvent = function(event,empCol,roomCol){

		var schEvent = [];
		
		var employees = event.employees;
		var rooms = event.rooms;

		for (var i = 0; i < employees.length; i++) {

			var empID = employees[i].EmployeeId;
			var empIndex = empCol.findIndex(x => empID == x._id);
			var resource = 'e'+empIndex;

			var newEvent = {
            start: new DayPilot.Date(new Date(employees[i].MeetingId.startDate), true),
            end: new DayPilot.Date(new Date(employees[i].MeetingId.endDate), true),
            id: DayPilot.guid(),
            resource: resource,
            text: employees[i].MeetingId.subject,
            backColor: colorList[employees[i].Status],
			};
			
			schEvent.push(newEvent);

		}

		for (var i = 0; i < rooms.length; i++) {
			var roomID = rooms[i].room._id;
			var roomIndex = roomCol.findIndex(x => roomID == x._id);
			var resource = 'r'+roomIndex;

			var newEvent = {
            start: new DayPilot.Date(new Date(rooms[i].startDate), true),
            end: new DayPilot.Date(new Date(rooms[i].endDate), true),
            id: DayPilot.guid(),
            resource: resource,
            text: rooms[i].subject,
            backColor: colorList['1'],
			};
			
			schEvent.push(newEvent);

		}

		return schEvent;

	}



	// Strings:
   this.roomToString = function(data){
      return data.Number + '(' + data.Capacity + ')';
   }
   this.employeeToString = function(data){
      return data.LastName + ', ' + data.FirstName;
   }
   this.eventToString = function(event){
      return 'Subject: ' + event.subject + '\n' + 
      'Owner: ' + event.owner + '\n' + 
      'Start: ' + event.startDate + '\n' +  
      'End: ' + event.endDate +  '\n' + 
      'Room:' + event.room +  '\n' + 
      'Attendees:' + event.attendees;
   }

	// Helper function to combine date and time into single Date object
	this.combineDateTime = function(date, time){
		if (date === null || time === null){
			return;
		}
		
		//var newdate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      //var adate = new Date();
      var date = new Date(date);
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      var utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      return date;
   }
   
   // colors
   var colorList = {
      '-2': 'red',
      '-1': 'blue',
      '0': 'salmon',
      '1': 'grey',
   }
})