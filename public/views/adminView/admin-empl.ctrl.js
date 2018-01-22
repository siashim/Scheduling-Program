mainapp.controller('adminEmployeeCtrl', function($scope, adminEmplFactory, adminEmplService){
   $scope.employees = [];
   $scope.empModal = {};
   
   // When the view button is clicked, open an alert messagebox
   $scope.viewEmp = function(empid, id){
      adminEmplFactory.getEmployee(id).then(function(response){
         alert(adminEmplService.employeeToString(response.data));
      }), function(err){
         console.log(err);
      }
	} 
   
   // When the update button is clicked, open a modal dialog for data entry
   $scope.updateEmpDialog = function(empid, id){
      adminEmplFactory.getEmployee(id).then(function(response){
         $scope.empModal = adminEmplService.setEmployeeModalData(response.data);
         $('#empModal').modal({});
      }), function(err){
         console.log(err);
      }
	} 

   // Send update data to db
   $scope.updateEmp = function(){
      var id = $scope.empModal.id;
      var data = adminEmplService.getEmployeeModalData();
      adminEmplFactory.putEmployee(id, data).then(function(response){
         refresh();
      }), function(err){
         console.log(err);
      }
   }

   // When the delete button is clicked, open a confirmation messagebox
   $scope.deleteEmp = function(empid, id){
      var deleteMsg = adminEmplService.confirmDeleteMsg(empid);
      var result = confirm(deleteMsg);
      if (result === true){
         adminEmplFactory.deleteEmployee(id).then(function(){
            refresh();
         }), function(err){
            console.log(err);
         }
      }
	}

   // When the create button is clicked, post data to the db
   $scope.createEmp = function(){
      var data = adminEmplService.getCreateEmployeeData();
      adminEmplFactory.postEmployee(data).then(function(){
         refresh();
      }), function(err){
         console.log(err);
      }
	}

   // Refresh data in browser with data from db
   var refresh = function(){
      adminEmplFactory.getAllEmployees().then(function(response){
         $scope.employees = response.data; 
      }), function(err){
         console.log(err);
      }
   }

   // Initialize the table with data
	$(document).ready(refresh())
})