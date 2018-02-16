mainapp.factory('homeFactory', function($http){
   var factory = {};

   factory.getAllReminders = function(id){
      return $http.get('/home/reminders/'+id);
   }

   factory.getAllNotifications = function(user){
       console.log('CURRENT USER FACTORY',user);
      return $http.get('/home/notifications/'+user.empId,{
          params: {mid: user.mid}
      });
   }

   factory.getAllMeetings = function(id){
      return $http.get('/home/meetings/'+id);
   }

   factory.putNotification = function(id, data){
      return $http.put('/home/notification/'+id, data);
   }
   
   factory.deleteReminder = function(id){
      return $http.delete('/home/reminders/'+id);
   }

   return factory;
});