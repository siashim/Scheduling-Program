mainapp.controller('meetingCtrl', function ($scope, $http){
   $scope.event = {
      subject: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      room: '',
      attendees: [],
   }
   $scope.times = ['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00'];
   $scope.selectedRooms = [
      { number: '100', capacity:'20', 
         events:[
            {time:'8:00' , busy:'meet', class:'bg-danger'},
            {time:'9:00' , busy:'',     class:'bg-success'},
            {time:'10:00', busy:'',     class:'bg-success'},
            {time:'11:00', busy:'meet', class:'bg-danger'},
            {time:'12:00', busy:'',     class:'bg-success'},
            {time:'1:00',  busy:'',     class:'bg-success'},
            {time:'2:00',  busy:'meet', class:'bg-danger'},
            {time:'3:00',  busy:'',     class:'bg-success'},
            {time:'4:00',  busy:'',     class:'bg-success'},
            {time:'5:00',  busy:'meet', class:'bg-danger'},
            ] },
      { number: '101', capacity:'10', 
         events:[
            {time:'8:00' , busy:'meet', class:'bg-danger'},
            {time:'9:00' , busy:'meet', class:'bg-danger'},
            {time:'10:00', busy:'meet', class:'bg-danger'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { number: '200', capacity:'6', 
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'meet', class:'bg-danger'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]},
      { number: '201', capacity:'6', 
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'meet', class:'bg-danger'},
            {time:'12:00', busy:'meet', class:'bg-danger'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'meet', class:'bg-danger'},
            {time:'5:00',  busy:'meet', class:'bg-danger'},
            ]},
      { number: '300', capacity:'12', events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]},
   ]
   $scope.selectedEmployees = [
      { FirstName: 'Abe', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { FirstName: 'Bob', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { FirstName: 'Cal', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { FirstName: 'Dav', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'meet', class:'bg-danger'},
            {time:'2:00',  busy:'meet', class:'bg-danger'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { FirstName: 'Eve', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'meet', class:'bg-danger'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]
      },
      { FirstName: 'Fig', LastName: 'Burger',
         events:[
            {time:'8:00' , busy:'', class:'bg-success'},
            {time:'9:00' , busy:'', class:'bg-success'},
            {time:'10:00', busy:'', class:'bg-success'},
            {time:'11:00', busy:'', class:'bg-success'},
            {time:'12:00', busy:'', class:'bg-success'},
            {time:'1:00',  busy:'', class:'bg-success'},
            {time:'2:00',  busy:'', class:'bg-success'},
            {time:'3:00',  busy:'', class:'bg-success'},
            {time:'4:00',  busy:'', class:'bg-success'},
            {time:'5:00',  busy:'', class:'bg-success'},
            ]   
      },
   ]

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
      alert('Here the user can add or remove rooms from schedule viewer');
   }
   $scope.selectEmployees = function(){
      alert('Here the user can add or remove employees from schedule viewer');
   }
});