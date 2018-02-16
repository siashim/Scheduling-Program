mainapp.factory('homeFactory', function($http){
   var factory = {};

   factory.getAllReminders = function(user){
      return $http.get('/home/reminders/'+user.empId, {
          params: {mid: user.mid}
      });
   }

   factory.getAllNotifications = function(user){
      return $http.get('/home/notifications/'+user.empId,{
          params: {mid: user.mid}
      });
   }

   factory.getAllMeetings = function(id){
      return $http.get('/home/meetings/'+id);
   }

   factory.putNotification = function(msg){      
      return $http.put('/home/notification/'+msg._id, msg);
   }
   
   factory.deleteReminder = function(id){
      return $http.delete('/home/reminders/'+id);
   }

   return factory;
});