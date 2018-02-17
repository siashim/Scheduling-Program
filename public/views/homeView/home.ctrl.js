mainapp.controller('homeCtrl', function ($scope, $rootScope, $http, $location, $anchorScroll, homeFactory){
   $scope.reminders = [];
   $scope.notifications = [];

   // Calendar
   var calendar = new DayPilot.Month("dpm");
   calendar.cssClassPrefix = "month_green";
   calendar.startDate = new DayPilot.Date(Date.now()),
   calendar.viewType = "Weeks";
   calendar.weeks = 3;
   calendar.init();

   $scope.respondToNotification = function(msg, val) {

      msg.status = val;
      msg.empId = $rootScope.currentUser.empId;
      msg.mid = $rootScope.currentUser.mid;

      homeFactory.putNotification(msg).then(function(response){
         refresh();
      }), function(err){
         console.log(err);
      };

   }

   $scope.deleteReminder = function(id){
      if(confirm('OK to delete this event?')){
         homeFactory.deleteReminder(id).then(function(response){
            refresh();
         }), function(err){
            console.log(err);
         }
      };
   }

   $scope.gotoAnchor = function(x) {
      $location.hash(x);
   };

   // Refresh data in browser with data from db
   var refresh = function(){

      var id = $rootScope.currentUser.empId;
      var mid = $rootScope.currentUser.mid;

      homeFactory.getAllReminders($rootScope.currentUser).then(function(response){
         $scope.reminders = response.data; 


         console.log('REMINDERS RESPONSE',response.data);


      }), function(err){
         console.log(err);
      }

      homeFactory.getAllNotifications($rootScope.currentUser).then(function(response){
         $scope.notifications = response.data;


         console.log('NOTIFICATION RESPONSE',response.data);

         
      }), function(err){
         console.log(err);
      }

      homeFactory.getAllMeetings(id).then(function(response){
         calendar.events.list = response.data;
         calendar.update();
      }), function(err){
         console.log(err);
      }
   }

   // Initialize the page with data
   $(document).ready(refresh())
});