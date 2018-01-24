mainapp.controller('meetingCtrl', function ($scope, $http){
   $scope.event = {
      subject: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      room: '',
      attendees: [],
   }
   $scope.empList = { 
      selectedEmp:[
         {name:'smith, sam'},
         {name:'tree, tom'},
         {name:'umbrella, uma'},
      ],
      unselectedEmp:[
         {name:'kilo, kel'},
         {name:'meadow, mel'},
         {name:'standish, sky'},
         {name:'vampire, vic'},
         {name:'willow, wes'},
         {name:'zillion, zoe'},
      ],
   };
   $scope.roomList = { 
      selectedRooms:[
         {name:'201(10)'},
         {name:'202(10)'},
         {name:'302(8)'},
      ],
      unselectedRooms:[
         {name:'100(100)'},
         {name:'101(50)'},
         {name:'102(26)'},
         {name:'303(26)'},
         {name:'304(20)'},
         {name:'409(8)'},
         {name:'410(6)'},
      ],
   };
   // initialize input widgets first
   $('#datetimepicker .date').datepicker({
      'format': 'm/d/yyyy',
      'autoclose': true
   });
   $('#datetimepicker .time').timepicker({
      'showDuration': true,
      'timeFormat': 'g:ia'
   });

   // Watch for change events
   $('#datetimepicker .date.start').datepicker()
   .on('changeDate', function(e){
      $scope.$apply(function(){
         $scope.event.startDate = $('#datetimepicker .date.start').datepicker('getDate');
         $scope.event.endDate = $scope.event.startDate;
      })
   });
   $('#datetimepicker .date.end').datepicker()
   .on('changeDate', function(e){
      $scope.$apply(function(){
         $scope.event.endDate = $('#datetimepicker .date.end').datepicker('getDate');
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

   // initialize datepair
   var startDatetimepicker = document.getElementById('datetimepicker');
   var endDatetimepicker = new Datepair(startDatetimepicker, {
      'defaultDateDelta': 0,      // days
      'defaultTimeDelta': 3600000 // milliseconds
   });

   $scope.selectRooms = function(){
      $('#roomSelModal').modal({});
   }

   // When the employeeSelect button is clicked, open a modal dialog for data entry
   $scope.selectEmployees = function(){
      $('#empSelModal').modal({});
   }

   $scope.createMeeting = function(){
      var string = 'Subject: ' + $scope.event.subject + '\n' + 
         'Start: ' + $scope.event.startTime.toLocaleString() + '\n' +  
         'End: ' + $scope.event.endTime.toLocaleString() +  '\n' + 
         'Room:' + $scope.event.room +  '\n' + 
         'Attendees:' + $scope.event.attendees;
      alert(string);
   }

   // Daypilot scheduler
   var dp_rooms = [
      {id:'r1', name:'201(10)'},
      {id:'r2', name:'202(10)'},
      {id:'r3', name:'302(8)'},
   ];
   var dp_employees = [
      {id:'e1', name:'Alpha, Ana'},
      {id:'e2', name:'Bravo, Bob'},
      {id:'e3', name:'Charlie, Cal'},
      {id:'e4', name:'Delta, Del'},
      {id:'e5', name:'Tango, Tom'},
   ];
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
   var resources = [
      {
         "id": "group_1",
         "name": "Rooms",
         "expanded": true,
         "children": dp_rooms,
      },
      {
         "id": "group_2",
         "name": "Employees",
         "expanded": true,
         "children": dp_employees,
      }
   ]

   $scope.schedulerConfig = {
      scale: "Hour",
      // days: new DayPilot.Date().daysInMonth(),
      days: 1,
      startDate: new DayPilot.Date().firstDayOfMonth(),
      timeHeaders: [
          { groupBy: "Day" },
          { groupBy: "Hour", format: "hh:mm" }
      ],
      cellWidthSpec: 'Auto',

      businessBeginsHour: 8,
      businessEndsHour: 18,
      showNonBusiness: false,

      treeEnabled: true,
      resources: resources,
   };
   $scope.events = dp_events;
});