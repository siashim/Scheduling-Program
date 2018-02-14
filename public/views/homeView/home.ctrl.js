mainapp.controller('homeCtrl', function ($scope, $rootScope, $http, $location, $anchorScroll, homeFactory){
   $scope.reminders = [];
   $scope.notifications = [];

   // Calendar
   var calendar = new DayPilot.Month("dpm");
   calendar.cssClassPrefix = "month_green";
   calendar.startDate = "2018-01-01";
   calendar.init();

   $scope.respondToNotification = function(id, val){
      var data = {response: val};
      homeFactory.putNotification(id, data).then(function(response){
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
      
      homeFactory.getAllReminders(id).then(function(response){
         $scope.reminders = response.data; 
      }), function(err){
         console.log(err);
      }

      homeFactory.getAllNotifications(id).then(function(response){
         $scope.notifications = response.data;
         console.log($scope.notifications); 
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