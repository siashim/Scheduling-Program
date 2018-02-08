// $http functions for admin room view
mainapp.factory('meetingFactory', function($http){
   var factory = {}
   
   factory.getAllRooms = function(){
      return $http.get('/meeting/rooms');
   }

   return factory;
})