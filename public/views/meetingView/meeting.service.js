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

   // Get list for Daypilot scheduler of only 'selected' items from master list
   this.getSelected = function(listName, list){
      var ary = [];
      
      for (i=0; i<list.length; i++){
         if(list[i].selected == true){
            var element = {};
            if (listName == 'room'){
               element = {
                  id: 'r' + i,
                  name: this.roomToString(list[i]),
               }
            }
            else if (listName == 'employee'){
               element = {
                  id: 'e' + i,
                  name: this.employeeToString(list[i]),
               }
            }            
            ary.push(element);
         }
      }
      return ary;
   }
   // Get all 'selected' employee _id's from list
   this.getAttendeeIds = function(list){
      var result = [];
      for(var i=0; i<list.length; i++){
         if(list[i].selected == true){
            result.push(list[i]._id);
         }
      }
      return result;
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
})