mainapp.controller('homeCtrl', function ($scope, $http){
    $scope.notifications = [
       {
            requester: 'Boss',
            subject: 'Daily Scrum',
            date: 'Mon 1/15/2018',
            time: '10:00 AM',
            room: '121',
       },
       {
            requester: 'Director',
            subject: 'Project planning session',
            date: 'Mon 1/15/2018',
            time: '3:00 PM',
            room: 'Bldg. 8 Room 102',
      },
      {
         requester: 'CEO',
         subject: 'All hands meeting',
         date: 'Mon 1/16/2018',
         time: '3:00 PM',
         room: '100',
      },
      {
         requester: 'Boss',
         subject: 'Daily Scrum',
         date: 'Mon 1/16/2018',
         time: '10:00 AM',
         room: '121',
      },
   ]

   // Calendar
   var calendar = new DayPilot.Month("dpm");
   calendar.cssClassPrefix = "month_green";
   calendar.startDate = "2018-01-01";
   calendar.init();

   calendar.events.list = [
      {
         start: "2018-01-01T08:00:00",
         end: "2018-01-01T09:00:00",
         id: "1",
         text: "Daily Scrum"
      },
      {
         start: "2018-01-02T08:00:00",
         end: "2018-01-02T09:00:00",
         id: "2",
         text: "Daily Scrum"
      },
      {
         start: "2018-01-04T08:00:00",
         end: "2018-01-04T09:00:00",
         id: "3",
         text: "Daily Scrum"
      },
      {
         start: "2018-01-05T08:00:00",
         end: "2018-01-05T09:00:00",
         id: "4",
         text: "Daily Scrum"
      },
      {
         start: "2018-01-02T13:00:00",
         end: "2018-01-02T14:00:00",
         id: "5",
         text: "Team Meeting"
      },
      {
         start: "2018-01-05T15:00:00",
         end: "2018-01-05T16:00:00",
         id: "6",
         text: "Weekly Review"
      },
   ];
   calendar.update();

   $scope.accept = function(){
      alert('(TODO) Notify server of accept, add event to calendar, and remove from this list.');
   }
   $scope.decline = function(){
      alert('(TODO) Notify server of decline, and removefrom this list.');
   }
   $scope.edit = function(){
      alert('(TODO) User will go the Meeting page to edit this event.');
   }
   $scope.delete = function(){
      alert('Are you sure you want to delete this event?\n (TODO: delete this event)');
   }
});