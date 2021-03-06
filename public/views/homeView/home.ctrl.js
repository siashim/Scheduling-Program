
mainapp.controller('homeCtrl', function ($scope, $rootScope, $http, $location, $anchorScroll, $state, $stateParams, homeFactory){

   $scope.reminders = [];
   $scope.notifications = [];

   // Calendar
   var calendar = new DayPilot.Month("dpm");
   calendar.cssClassPrefix = "month_green";
   calendar.startDate = new DayPilot.Date(Date.now()),
   calendar.viewType = "Weeks";
   calendar.weeks = 3;
   calendar.init();
   
   // Legend
   document.getElementById("legendAccept").style.color = colors[1];
   document.getElementById("legendPending").style.color = colors[0];
   document.getElementById("legendOwner").style.color = colors[3];

   $scope.respondToNotification = function(msg, val) {

      var reminds = $scope.reminders.filter(x => x._id != msg._id);
      var startDate = new Date(msg.startDate);
      var endDate = new Date(msg.endDate);

      if (val == 1 && meetingConflicts(reminds,startDate,endDate)) {
         alert('Meeting conflicts with a previously scheduled meeting.');
         return;
      }
      
      msg.status = val;
      msg.empId = $rootScope.currentUser.empId;
      msg.mid = $rootScope.currentUser.mid;

      homeFactory.putNotification(msg).then(function(response){
         refresh();
      }), function(err){
         console.log(err);
      };

   }

   // On Reminder View button click, view meeting details in new page
   $scope.viewResponses = function(meeting){
      $state.go('response', {'meeting': meeting});
   };

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

      function shapeMeetings(data) {
         var mtgs = data.map(x => x.MeetingId);

         // temporary bandaid to prevent displaying bygone meetings
         var now = new Date();      
         mtgs = mtgs.filter(x => new Date(x.startDate) > now);

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

      homeFactory.getAllMeetings($rootScope.currentUser).then(function(res){

         function parseMeetingData(data) {
            
            var mtgs = data.map(function(meeting) {
               var mtg = meeting.MeetingId;

               // Set event colors
               var event_clr = colors[meeting.Status];
               if(meeting.EmployeeId === meeting.MeetingId.ownerID){
                  event_clr = colors[3]; // owner color
               }
               
               return {
                  start: new DayPilot.Date(new Date(mtg.startDate), true),
                  end: new DayPilot.Date(new Date(mtg.endDate), true),
                  id: mtg.subject,
                  text: calendarEventText(mtg),
                  backColor:  event_clr,
                  moveDisabled: true,
                  bubbleHtml: calendarEventBubbleHtml(mtg),
               };
            });
            return mtgs;
         }

         calendar.events.list = parseMeetingData(res.data);
         calendar.update();

      }), function(err){
         console.log(err);
      }
   }

   // Strings
   var calendarEventBubbleHtml = function(mtg){
      return '<b>' + mtg.subject + '</b><br>' + 
      '<b>Time: </b>' + new Date(mtg.startDate).toLocaleString('en-US',{hour:'numeric', minute:'numeric'}) + ' - ' +
      new Date(mtg.endDate).toLocaleString('en-US',{hour:'numeric', minute:'numeric'}) + '<br>' +
      '<b>Owner: </b>' + mtg.ownerFirst + ' ' + mtg.ownerLast + '<br>' + 
      '<b>Room(cap): </b>' + mtg.room.Number + '(' + mtg.room.Capacity + ')<br>' + 
      '<b>Meeting size: </b>' + mtg.attendees.length;
   };
   var calendarEventText = function(mtg){
      return new Date(mtg.startDate).toLocaleString(['en-US'],{hour: 'numeric', minute:'2-digit'}).slice(0, -2) + ' ' + 
      mtg.subject;
   };

   // Initialize the page with data
   $(document).ready(refresh())
});
