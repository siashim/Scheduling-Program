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

   $scope.deleteReminder = function(msg){
      if (confirm('OK to delete this event?')) {
         msg.mid = $rootScope.currentUser.mid;
         msg.empId = $rootScope.currentUser.empId;
         homeFactory.deleteReminder(msg).then(function(response) {
            refresh();
         },function(err) {
            console.log(err);
         });
      } 
   }



   $scope.gotoAnchor = function(x) {
      $location.hash(x);
   };

   // Refresh data in browser with data from db
   var refresh = function(){

      var id = $rootScope.currentUser.empId;
      var mid = $rootScope.currentUser.mid;

      function shapeMeetings(data) {
         var mtgs = data.map(x => x.MeetingId);
         return mtgs.sort(function(a,b){ 
            return new Date(a.startDate) - new Date(b.startDate) 
         });
      }

      homeFactory.getAllReminders($rootScope.currentUser).then(function(res){
         $scope.reminders = shapeMeetings(res.data);
      }), function(err){
         console.log(err);
      }

      homeFactory.getAllNotifications($rootScope.currentUser).then(function(res){
         $scope.notifications = shapeMeetings(res.data);
      }), function(err){
         console.log(err);
      }

      homeFactory.getAllMeetings($rootScope.currentUser).then(function(response){
         calendar.events.list = response.data;
         calendar.update();
      }), function(err){
         console.log(err);
      }
   }

   // Initialize the page with data
   $(document).ready(refresh())
});