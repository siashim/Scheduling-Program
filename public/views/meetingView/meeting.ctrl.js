mainapp.controller('meetingCtrl', function ($scope, $http, meetingFactory, meetingService){
   $scope.rooms = [];
   $scope.employees = [];
   $scope.event = {
      subject: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      room: '',
      attendees: [],
   }

   // On create meeting button click, post data to server
   $scope.createMeeting = function(){
      var select = document.getElementById('sel1Room');
      var options = select && select.options;
      var newEvent = {
         owner: 'TODO',
         subject: $scope.event.subject,
         room: options[options.selectedIndex].value,
         startDate: new Date($scope.event.startTime),
         endDate: new Date($scope.event.endTime),
         attendees: meetingService.getAttendeeIds($scope.employees),
      }

      meetingFactory.postEvent(newEvent).then(function(){
         alert('Meeting sent to server:\n' + meetingService.eventToString(newEvent));
      }), function(err){
         console.log(err);
      }
   }

   // Initialize form input datetime widgets first
   $('#datetimepicker .date').datepicker({
      'format': 'm/d/yyyy',
      'autoclose': true
   });
   $('#datetimepicker .time').timepicker({
      'showDuration': true,
      'timeFormat': 'g:ia'
   });
   var startDatetimepicker = document.getElementById('datetimepicker');
   var endDatetimepicker = new Datepair(startDatetimepicker, {
      'defaultDateDelta': 0,      // 0 days
      'defaultTimeDelta': 3600000 // 1 hour
   });

   // Watch for datetime widget change events
   $('#datetimepicker .date.start').datepicker()
   .on('changeDate', function(e){
      $scope.$apply(function(){
         $scope.event.startDate = $('#datetimepicker .date.start').datepicker('getDate');
         $scope.event.endDate = $scope.event.startDate;
         $scope.schedulerConfig.startDate = $scope.event.startDate;
      })
   });
   $('#datetimepicker .date.end').datepicker()
   .on('changeDate', function(e){
      $scope.$apply(function(){
         $scope.event.endDate = $('#datetimepicker .date.end').datepicker('getDate');
         $scope.schedulerConfig.startDate = $scope.event.endDate;
      })   
   });
   $('#datetimepicker .time.start').timepicker()
   .on('changeTime', function(e){
      $scope.$apply(function(){
         $scope.event.startTime = $('#datetimepicker .time.start').timepicker('getTime', $scope.event.startDate);
      })   
   });
   $('#datetimepicker .time.end').timepicker()
   .on('changeTime', function(e){
      $scope.$apply(function(){
         $scope.event.endTime = $('#datetimepicker .time.end').timepicker('getTime', $scope.event.endDate);
      })
   });
   
   // On button click to select (or deselect) an option, update its 'selected' value 
   $scope.selectOption = function(type, selectId, val){
      var select = document.getElementById(selectId);
      var options = select && select.options;

      // All 'selected' items are set to true when selected (or false when unselected)
      for (var i=0; i<options.length; i++){
         if (options[i].selected){
            if (type == 'room'){
               $scope.rooms[options[i].value].selected = val;
            }
            if (type == 'emp'){
               $scope.employees[options[i].value].selected = val;
            }
         }  
      }
   }

   // Update DayPilot scheduler with 'selected' elements from master list(s) 
   $scope.updateScheduler = function(){
      $scope.scheduler.resources = [
         {
            "id": "group_1",
            "name": "Rooms",
            "expanded": true,
            "children": meetingService.getSelected('room', $scope.rooms),
         },
         {
            "id": "group_2",
            "name": "Employees",
            "expanded": true,
            "children": meetingService.getSelected('employee', $scope.employees),
         }
      ]
      $scope.scheduler.update();
   }

   // On CheckRooms button click, open a modal dialog
   $scope.selectRooms = function(){
      $('#roomSelModal').modal({});
   }

   // On CheckEmployees button click, open a modal dialog
   $scope.selectEmployees = function(){
      $('#empSelModal').modal({});
   }

   // Refresh data in browser with data from db
   var refresh = function(){
      meetingFactory.getAllRooms().then(function(response){
         $scope.rooms = meetingService.makeOptionsList(response.data); 
      }), function(err){
         console.log(err);
      }
      meetingFactory.getAllEmployees().then(function(response){
         $scope.employees = meetingService.makeOptionsList(response.data); 
      }), function(err){
         console.log(err);
      }
   }

   // Initialize the table with data
   $(document).ready(refresh())


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

   // Below this point is demo code


   // Daypilot scheduler
   var dp_events = [
      {
         start: new DayPilot.Date("2018-01-01T10:00:00"),
         end: new DayPilot.Date("2018-01-01T11:00:00"),
         id: DayPilot.guid(),
         resource: "r1",
         text: "Meeting"
      },
      {
         start: new DayPilot.Date("2018-01-01T13:00:00"),
         end: new DayPilot.Date("2018-01-01T14:00:00"),
         id: DayPilot.guid(),
         resource: "r2",
         text: "Meeting"
      },
      {
         start: new DayPilot.Date("2018-01-01T10:00:00"),
         end: new DayPilot.Date("2018-01-01T11:00:00"),
         id: DayPilot.guid(),
         resource: "e1",
         text: "Meeting (?)",
         backColor: "salmon",
      },
      {
         start: new DayPilot.Date("2018-01-01T10:00:00"),
         end: new DayPilot.Date("2018-01-01T11:00:00"),
         id: DayPilot.guid(),
         resource: "e2",
         text: "Meeting",
      },
      {
         start: new DayPilot.Date("2018-01-01T13:00:00"),
         end: new DayPilot.Date("2018-01-01T14:00:00"),
         id: DayPilot.guid(),
         resource: "e3",
         text: "Meeting",
      },
      {
         start: new DayPilot.Date("2018-01-01T13:00:00"),
         end: new DayPilot.Date("2018-01-01T14:00:00"),
         id: DayPilot.guid(),
         resource: "e4",
         text: "Meeting",
      },
   ];
   var resources = []
   
   $scope.schedulerConfig = {
      scale: "Hour",
      days: 1,
      startDate: new DayPilot.Date.today(),
      timeHeaders: [
          { groupBy: "Day" },
          { groupBy: "Hour", format: "hh:mm" }
      ],
      cellWidthSpec: 'Auto',

      businessBeginsHour: 8,
      businessEndsHour: 18,
      showNonBusiness: false,

      treeEnabled: true,
      resources:[
      {
         "id": "group_1",
         "name": "Rooms",
         "expanded": true,
         "children": [],
      },
      {
         "id": "group_2",
         "name": "Employees",
         "expanded": true,
         "children": [],
      }]
   };
   $scope.events = dp_events;
});