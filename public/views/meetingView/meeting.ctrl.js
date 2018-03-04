
mainapp.controller('meetingCtrl', function ($scope, $rootScope, $http, meetingFactory, meetingService){

   $scope.rooms = [];
   $scope.employees = [];
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
      resources: [
         meetingService.setSchedulerResources([], 'Rooms', 'group_1', 'r'),
         meetingService.setSchedulerResources([], 'Employees', 'group_2','e'),
      ],
   };
   $scope.schedulerEvents = [];

   // On create meeting button click, post data to server
   $scope.createMeeting = function(){

      if (validateForm() == false){
        return;
      }

      var select = document.getElementById('sel1Room');
      var options = select && select.options;
      var user = $rootScope.currentUser;
      
      var startDate = $('#datetimepicker .date.start').datepicker('getDate');
		var startTime = $('#datetimepicker .time.start').timepicker('getTime');
		var endDate = $('#datetimepicker .date.end').datepicker('getDate');
      var endTime = $('#datetimepicker .time.end').timepicker('getTime');

      var selectedEmployees = $scope.employees.filter(function(item){
         return item.selected == true;
      });

      var newEvent = {
         ownerFirst: user.firstName,
         ownerLast: user.lastName,
         ownerID: user.mid,
         subject: $scope.subject,
         room: options[options.selectedIndex].value,
         startDate: meetingService.combineDateTime(startDate, startTime),
         endDate: meetingService.combineDateTime(endDate, endTime),
         attendees: selectedEmployees,
      }
      
      meetingFactory.postEvent(newEvent).then(function(){
         formMessage('Meeting created: ' + newEvent.subject, 'black');
      }), function(err){
         formMessage('Error. Server responded: ' + err,'red');
         console.log(err);
      }
   }

   // Form validators
   function validateForm() {

      if ($scope.subject == undefined || $scope.subject === ''){
         formMessage('Subject required to create meeting.', 'red');
         return false;
      }

      // employee must be selected
      var listOfSelected = $scope.employees.filter(function(emp){
         return emp.selected;
      });

      if (listOfSelected.length == 0){
         formMessage('At least one invitee required to create meeting.', 'red');
         return false;
      }

      // can this be removed?
      // ex, personal days may not need a room
      // or perhaps the room can be 'Personal'
      // room must be selected
      var select = document.getElementById('sel1Room');
      var options = select && select.options;
      var roomID = options[options.selectedIndex].value;
      if (roomID == ''){
         formMessage('A room is required to create meeting.', 'red');
         return false;
      }

      // TODO check this, there is probably a better way
      var room = options[options.selectedIndex].textContent;
      var roomSize = parseInt(room.split(/\(|\)/)[1]);
      if (listOfSelected.length > roomSize) {
         formMessage('The room is not large enough to hold this meeting.','red');
         return false;
      }

      var startDate = $('#datetimepicker .date.start').datepicker('getDate');
		var startTime = $('#datetimepicker .time.start').timepicker('getTime');
      var startDateTime = meetingService.combineDateTime(startDate, startTime);
		
      if (startDate === null) {
         formMessage('A starting date is required.','red');
         return false;
      }

      if (startTime === null) {
         formMessage('A starting time is required.','red');
         return false;
      }

      var currentDate = new Date();
      if (startDateTime < currentDate) {
         formMessage('The date selected has passed. Select a new date.','red');
         return false;
      }

      var endDate = $('#datetimepicker .date.end').datepicker('getDate');
      var endTime = $('#datetimepicker .time.end').timepicker('getTime');
      var endDateTime = meetingService.combineDateTime(endDate,endTime);

      var bookings = $scope.roomBookings;
      var candidateMtgs = bookings.filter(x => x.room._id == roomID);
      var roomConflicts = candidateMtgs.find(function(x) {
         var start = new Date(x.startDate);
         var end = new Date(x.endDate);
         if ((startDateTime >= start && startDateTime < end) ||
            (endDateTime > start && endDateTime <= end) ||
            (startDateTime <= start && endDateTime >= end)) 
         {
            return true;
         }
      });

      if (roomConflicts != undefined) {
         formMessage('This room selected is already booked during this time.','red');
         return false;
      }

   }

   // Form message
   function formMessage(message, color){
      document.getElementById("formmsg").style.color = color;
      document.getElementById('formmsg').innerHTML = message;
   }
 
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

   // When user changes date, update scheduler date and resources too
   $('#datetimepicker .date.start').datepicker()
      .on('changeDate', function(e) {
         $scope.$apply(function(){
            $scope.scheduler.startDate = $('#datetimepicker .date.start').datepicker('getDate');
            $scope.updateScheduler();
         })
   });

   // Update DayPilot scheduler with 'selected' elements from master list(s) 
   $scope.updateScheduler = function(){
      
      // Get user-selected date
      var startDate = $('#datetimepicker .date.start').datepicker('getDate');
      var startTime = $('#datetimepicker .time.start').timepicker('getTime');
      var date = meetingService.combineDateTime(startDate, startTime);
      if(date === undefined){
         date = Date.now();
      }

      // Update scheduler left column
      var selectedRooms = $scope.rooms.filter(function(item){
         return item.selected;
      });

      var selectedEmployees = $scope.employees.filter(function(item){
         return item.selected;
      });

      $scope.scheduler.resources = [
         meetingService.setSchedulerResources(selectedRooms, 'Rooms', 'group_1', 'r'),
         meetingService.setSchedulerResources(selectedEmployees, 'Employees', 'group_2','e'),
      ];

      refreshScheduleEvents(startDate, selectedEmployees, selectedRooms);
      $scope.scheduler.update();

   }

   // Refresh Daypilot schedule events by request from database
   var refreshScheduleEvents = function(date, employees, rooms){
      var data = {date: date, employees: employees, rooms: rooms};
      meetingFactory.postSelectedEvents(data).then(function(response){
         $scope.roomBookings = response.data.rooms;
         $scope.schedulerEvents = meetingService.eventToSchedulerEvent(response.data,employees,rooms);
      }, function(err){
         console.log(err);
      })
   }

   // On CheckRooms button click, open a modal dialog
   $scope.selectRooms = function(){
      $('#roomSelModal').modal({});
   }

   // On CheckEmployees button click, open a modal dialog
   $scope.selectEmployees = function(){
      $('#empSelModal').modal({});
   }

   // Initialize data on page load with data from db
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

      // Initialize form input datetime widgets first
      $('#datetimepicker .date').datepicker({
         'format': 'm/d/yyyy',
         'autoclose': true,
      });
      $('#datetimepicker .time').timepicker({
         'showDuration': true,
         'timeFormat': 'g:ia',
         'scrollDefault': 'now'
      });
      // Initialize datepair so date and time widgets can interact
      var startDatetimepicker = document.getElementById('datetimepicker');
      var endDatetimepicker = new Datepair(startDatetimepicker, {
         'defaultDateDelta': 0,      // 0 days
         'defaultTimeDelta': 3600000 // 1 hour
      });
   }

   // Initialize the table with data
   $(document).ready(refresh())
});

