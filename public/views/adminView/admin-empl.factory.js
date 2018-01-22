// $http functions for adminCtrl
mainapp.factory('adminEmplFactory', function($http){
   var factory = {}

   // Factory to handle all $http requests from server
   factory.getAllEmployees = function(){
      return $http.get('/admin/employees');
   }

   factory.getEmployee = function(id){
      return $http.get('/admin/employees/'+id);
   }

   factory.postEmployee = function(data){
      return $http.post('/admin/employees', data);
   }

   factory.putEmployee = function(id, data){
      return $http.put('/admin/employees/'+id, data);
   }

   factory.deleteEmployee = function(id){
      return $http.delete('/admin/employees/'+id);
   }

   return factory
})