mainapp.controller('adminEmployeeCtrl', function($scope, $timeout, adminEmplFactory, adminEmplService){
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
   $scope.createEmp = function() {
      if (formValid() === false) { return; }
      var data = adminEmplService.getCreateEmployeeData();
      adminEmplFactory.postEmployee(data).then(function(res){
         console.log(res.data.found);
         if (res.data.found) {
            return formError('A unique employee ID is required.');
         } else {
            formSuccess('Employee successfully created.');
            resetForm();
            refresh();
         }
      }), function(err){
         console.log(err);
      }

   }


   var formValid = function() {      
      if ($('#fname').val().trim() == '')
         return formError('An employee first name is required.');
      if ($('#lname').val().trim() == '')
         return formError('An employee last name is required.');
      if ($('#empid').val().trim() == '')
         return formError('An employee ID is required.');
      if ($('#pos').val().trim() == '')
         return formError('An employee position is required.');
      return true;
   }

   var resetForm = function() {
      $('#fname.form-control').val('');
      $('#lname.form-control').val('');
      $('#empid.form-control').val('');
      $('#pos.form-control').val('');
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