// $http functions for admin room view
mainapp.factory('meetingFactory', function($http){
   var factory = {}
   
   factory.getAllRooms = function(){
      return $http.get('/meeting/rooms');
   }

   factory.getAllEmployees = function(){
      return $http.get('/meeting/employees');
   }

   factory.postEvent = function(data){
      return $http.post('/meeting/event', data);
   }

   factory.postSelectedEvents = function(data){
      return $http.post('/meeting/selectedEvents', data);
   }

   return factory;
})