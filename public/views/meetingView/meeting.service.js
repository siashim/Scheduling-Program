// Helper functions for meetingCtrl
mainapp.service('meetingService', function(){
   // Accessors
   this.getCreateEmployeeData = function(){
      var data = {
         FirstName: document.getElementById("fname").value,
         LastName: document.getElementById("lname").value,
         EmployeeId: document.getElementById("empid").value,
         Password: "",
         Position: document.getElementById("pos").value,
      };
      return data;
   }
   
   //Strings
   this.roomToString = function(data){
      return 'Number: ' + data.Number + '\n' +  
             'Capacity: ' + data.Capacity + '\n'
   }
})