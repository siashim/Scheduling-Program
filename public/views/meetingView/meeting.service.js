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
   // the rearranging of meetings happens here potentially
   this.eventToSchedulerEvent = function(events){
      var schEvent = [];
      var roomNum = 1;
      var empNum = 1;

      for(var i=0; i<events.length; i++){
         var resource;
         if (true){
            resource = 'e' + empNum;
            empNum++;
         } else {
            resource = 'r' + roomNum
            roomNum++;
         }

         var newEvent = {
            start: new DayPilot.Date(new Date(events[i].MeetingId.startDate), true),
            end: new DayPilot.Date(new Date(events[i].MeetingId.endDate), true),
            id: DayPilot.guid(),
            resource: resource,
            text: events[i].MeetingId.subject,
            backColor: colorList[events[i].Status],
         };
         schEvent.push(newEvent);
         
      }

      //console.log('scheduled events\n',schEvent);

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