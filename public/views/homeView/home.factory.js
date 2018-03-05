
mainapp.factory('homeFactory', function($http){
   var factory = {};

   factory.getAllReminders = function(user){
      return $http.get('/home/reminders/'+user.empId, {
          params: { mid: user.mid }
      });
   }

   factory.getAllNotifications = function(user){
      return $http.get('/home/notifications/'+user.empId,{
          params: { mid: user.mid }
      });
   }

   factory.getAllMeetings = function(user){
      return $http.get('/home/meetings/'+user.empId, {
         params: { mid: user.mid }
      });
   }

   factory.putNotification = function(msg){      
      return $http.put('/home/notification/'+msg._id, msg);
   }
   
   factory.deleteReminder = function(msg){
      console.log('delete reminder frontend',msg);
      return $http.delete('/home/reminders/'+msg.empId, {
         params: { 
            empId: msg.mid,
            id: msg._id
          }
      });
   }

   return factory;
});
