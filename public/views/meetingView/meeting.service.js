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
   
	// Convert database event format to DayPilot event format
   this.eventToSchedulerEvent = function(event,empCol,roomCol){
      var dpEvents = [];

      event.employees.map(function(element){
         var newEvent = {
            start: new DayPilot.Date(new Date(element.MeetingId.startDate), true),
            end: new DayPilot.Date(new Date(element.MeetingId.endDate), true),
            id: DayPilot.guid(),
            resource: 'e'+empCol.findIndex(x => element.EmployeeId == x._id),
            text: element.MeetingId.subject,
            backColor: colors[element.Status],
            moveDisabled: true,
            bubbleHtml: employeeEventBubbleHtml(element),
         };
         dpEvents.push(newEvent);
      });

      event.rooms.map(function(element){ 
         var newEvent = {
            start: new DayPilot.Date(new Date(element.startDate), true),
            end: new DayPilot.Date(new Date(element.endDate), true),
            id: DayPilot.guid(),
            resource: 'r'+roomCol.findIndex(x => element.room._id == x._id),
            text: element.subject,
            backColor: colors['1'],
            moveDisabled: true,
            bubbleHtml: roomEventBubbleHtml(element),
         };
         dpEvents.push(newEvent);
      });
      
      return dpEvents;
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
   var employeeEventBubbleHtml = function(element){
      return '<b>Subject: </b>' + element.MeetingId.subject + '<br>' + 
         '<b>Time: </b>' + new Date(element.MeetingId.startDate).toLocaleString('en-US',{month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) + ' - ' +
         new Date(element.MeetingId.endDate).toLocaleString('en-US',{month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) + '<br>' +
         '<b>Owner: </b>' + element.MeetingId.ownerFirst + ' ' + element.MeetingId.ownerLast; 
   };
   var roomEventBubbleHtml = function(element){
      return '<b>Subject: </b>' + element.subject + '<br>' + 
      '<b>Time: </b>' + new Date(element.startDate).toLocaleString('en-US',{month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) + ' - ' +
      new Date(element.endDate).toLocaleString('en-US',{month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'}) + '<br>' +
      '<b>Owner: </b>' + element.ownerFirst + ' ' + element.ownerLast + '<br>' + 
      '<b>Meeting size: </b>' + element.attendees.length;
   };

	// Helper function to combine date and time into single Date object
	this.combineDateTime = function(date, time){
		if (date === null){
			return;
		}
		
      var date = new Date(date);
      if(time === null){
         return date;
      }

      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      return date;
   }
   
   // colors
   // var colorList = {
   //    '-2': 'red',
   //    '-1': 'blue',
   //    '0': 'light grey',
   //    '1': 'salmon',
   // }
})