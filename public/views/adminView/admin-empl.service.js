// Helper functions for adminCtrl
mainapp.service('adminEmplService', function(){

   // Accessors
   this.getCreateEmployeeData = function(){
      var data = {
         FirstName: document.getElementById("fname").value,
         LastName: document.getElementById("lname").value,
         EmployeeId: document.getElementById("empid").value,
         Password: document.getElementById("empid").value, // Purposely make initial pwd=empid
         Position: document.getElementById("pos").value,
      };
      return data;
   }
   this.getEmployeeModalData = function(){
      var value = {
         firstname: document.getElementById("diafname").value,
         lastname: document.getElementById("dialname").value,
         employeeid: document.getElementById("diaempid").value,
         password: document.getElementById("diapwd").value,
         position: document.getElementById("diapos").value, 
      }
      return value;
   }
   this.setEmployeeModalData = function(data){
      var value = {
            firstname: data.FirstName,
            lastname: data.LastName,
            employeeid: data.EmployeeId,
            password: data.Password,
            id: data._id,
            position: data.Position,
      }
      return value;
   }
   
   // Strings
   this.confirmDeleteMsg = function(name){
      return "Are you sure you want to delete employee " + name + "?";
   }
   this.employeeToString = function(data){
      return 'First Name: ' + data.FirstName + '\n' +  
             'Last Name: ' + data.LastName + '\n' + 
             'Employee Id: ' + data.EmployeeId + '\n' + 
             'Password: ' + data.Password + '\n' + 
             'Position: ' + data.Position;
   }
})