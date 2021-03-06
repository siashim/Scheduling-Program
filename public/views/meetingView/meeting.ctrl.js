
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
      businessBeginsHour: 6,
      businessEndsHour: 20,
      showNonBusiness: false,

      treeEnabled: true,
      resources: [
         meetingService.setSchedulerResources([], 'Rooms', 'group_1', 'r'),
         meetingService.setSchedulerResources([], 'Employees', 'group_2','e'),
      ],
   };
   $scope.schedulerEvents = [];

   // Legend
   document.getElementById("legendAccept").style.color = colors[1];
   document.getElementById("legendPending").style.color = colors[0];
   document.getElementById("legendUnavailable").style.color = colors[2];

   $scope.warningIssued = false;
   
   // On create meeting button click, post data to server
   $scope.createMeeting = function() {

      if (validateForm() === false) { 
         return;
      }
      
      if (noEmployeeConflicts() === false) { 
         return; 
      }

      var select = document.getElementById('sel1Room');
      var options = select && select.options;
      var user = $rootScope.currentUser;
      
      var date = getStartAndEndDates();
      var selectedEmployees = $scope.employees.filter(function(item){
         return item.selected == true;
      });

      var newEvent = {
         ownerFirst: user.firstName,
         ownerLast: user.lastName,
         ownerID: user.mid,
         subject: $scope.subject,
         room: options[options.selectedIndex].value,
         startDate: date.startDateTime,
         endDate: date.endDateTime,
         attendees: selectedEmployees,
      }
      
      meetingFactory.postEvent(newEvent).then(function(){
         formSuccess('The meeting ' + newEvent.subject+' was created.');
         resetForm();
      }), function(err){
         formError('Inernal server error!');
         console.log(err);
      }
   }


   function getStartAndEndDates() {
      var startDate = $('#datetimepicker .date.start').datepicker('getDate');
	   var startTime = $('#datetimepicker .time.start').timepicker('getTime');
      var startDateTime = meetingService.combineDateTime(startDate, startTime);
      var endDate = $('#datetimepicker .date.end').datepicker('getDate');
      var endTime = $('#datetimepicker .time.end').timepicker('getTime');
      var endDateTime = meetingService.combineDateTime(endDate,endTime);
      return { 
         startDateTime: startDateTime,
         endDateTime: endDateTime,
         startDate: startDate,
         endDate: endDate,
         startTime: startTime,
         endTime: endTime
      };
   }

   // TODO break this into smaller functions
   // Form validators
   function validateForm() {

      if ($scope.subject == undefined || $scope.subject === '')
         return formError('Subject required to create meeting.');

      var dates = getStartAndEndDates();
      var currentDate = new Date();

      if (dates.startDate === null)
         return formError('A starting date is required.');

      if (dates.startTime === null)
         return formError('A starting time is required.');
      
      if (dates.endDate === null)
         return formError('An ending date is required.');
      
      if (dates.endTime === null)
         return formError('An ending time is required.');

      if (dates.startDateTime < currentDate)
         return formError('The date selected has passed. Select a new date.');

      // employee must be selected
      var listOfSelected = $scope.employees.filter(function(emp){
         return emp.selected;
      });

      if (listOfSelected.length == 0){
         return formError('At least one invitee required to create meeting.');
      }

      var select = document.getElementById('sel1Room');
      var options = select && select.options;
      var roomID = options[options.selectedIndex].value;
      
      if (roomID == ''){
         return formError('A room is required to create meeting.');
      }

      // TODO check this, there is probably a better way
      var room = options[options.selectedIndex].textContent;
      var roomSize = parseInt(room.split(/\(|\)/)[1]);
      if (listOfSelected.length > roomSize) {
         return formError('The room is not large enough to hold this meeting.');
      }

      var bookings = $scope.roomBookings;
      var candidateMtgs = bookings.filter(x => x.room._id == roomID);
      if (meetingConflicts(candidateMtgs,dates.startDateTime,dates.endDateTime)) {
         return formError('The room selected is already booked during this time.');
      }

      return true;

   }

   function noEmployeeConflicts() {
      var dates = getStartAndEndDates();
      var commitments = $scope.employeeCommitments.map(x => x.MeetingId);
      if (meetingConflicts(commitments,dates.startDateTime,dates.endDateTime)) {
         return formError('One or more employees is occupied during that time.');
      }
      return true;
   }


   // Form message
   function formMessage(message, color){
      document.getElementById("formmsg").style.color = color;
      document.getElementById('formmsg').innerHTML = message;
   }


   function resetForm() {

      // TOOD add more functionality to this, perhaps
      $('#subject.form-control').val('');
      $('#date.form-control').val('');
      $('#time.form-control').val('');
      $('#sel1Room.form-control').val('');
      
   }

   
   function displayInvitees() {
      var inviteesStr = $scope.employees.reduce(function(accum,elem) {
         if (elem.selected)
            return accum + '; ' + elem.LastName+', '+elem.FirstName;
         else 
            return accum;
      },'').substr(1);
      formInfo('<strong>Invitees:</strong> '+inviteesStr);
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

      displayInvitees();

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


      //if (selectedEmployees.length > 0)
      //   noEmployeeConflicts();

      refreshScheduleEvents(date, selectedEmployees, selectedRooms);
      $scope.scheduler.update();

   }

   // Refresh Daypilot schedule events by request from database
   var refreshScheduleEvents = function(date, employees, rooms){
      var data = {date: date, employees: employees, rooms: rooms};
      meetingFactory.postSelectedEvents(data).then(function(response){
         $scope.roomBookings = response.data.rooms;

         // testing employee stuff
         $scope.employeeCommitments = response.data.employees;

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

