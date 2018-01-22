// $http functions for admin room view
mainapp.factory('adminRoomFactory', function($http){
   var factory = {}

   // Factory to handle all $http requests from server
   factory.getAllRooms = function(){
      return $http.get('/admin/rooms');
   }

   factory.getRoom = function(id){
      return $http.get('/admin/rooms/'+id);
   }

   factory.postRoom = function(data){
      return $http.post('/admin/rooms', data);
   }

   factory.putRoom = function(id, data){
      return $http.put('/admin/rooms/'+id, data);
   }

   factory.deleteRoom = function(id){
      return $http.delete('/admin/rooms/'+id);
   }

   return factory
})