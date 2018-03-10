mainapp.controller('profileCtrl', function ($scope, $rootScope, profileFactory){
   
   $scope.form = {};
   $scope.available = createAvailable();
      
   function createAvailable(){
      var ary = [];
      for (var i = 0; i <= 23; i++){
         ary.push({
            checked: (i>=8 && i<17) ? true : false,
            slotStart: new Date(0, 0, 0, i, 0, 0, 0),
            slotEnd: new Date(0, 0, 0, i+1, 0, 0, 0),
         });
      }
      return ary;
   };

   // On Select All button click, set all check boxes 
   $scope.setAll = function(){
      $scope.available.forEach(x => x.checked = true);
   };
   // On Select None button click, clear all check boxes  
   $scope.setNone = function(){
      $scope.available.forEach(x => x.checked = false);
   };
   // On Select Work Hours button click, set some check boxes 
   $scope.setWorkhours = function(){
      $scope.available = createAvailable();
   };


   function formValid() {

      if ($('#fname.form-control').val().trim() == '') {
         return formError('A first name is required.');
      }
      if ($('#lname.form-control').val().trim() == '') {
         return formError('A last name is required.');
      }
      if ($('#pwd.form-control').val().trim() == '') {
         return formError('A password is required.');
      }

      return true;

   }


   // On submit button click, send user profile to db
   $scope.submit = function(){

      if (formValid() === false) { return; }

      var formchanges = {};
      if(document.getElementById('fname').value !== $scope.form.FirstName){
         formchanges.FirstName = document.getElementById('fname').value;
      }
      if(document.getElementById('lname').value !== $scope.form.LastName){
         formchanges.LastName = document.getElementById('lname').value;
      }
      if(document.getElementById('pwd').value !== $scope.form.Password){
         formchanges.Password = document.getElementById('pwd').value;
      }
      if(Object.keys(formchanges).length === 0 && formchanges.constructor === Object){
         return;
      };

      profileFactory.putProfileChanges($scope.form._id, formchanges).then(function(response){
         formSuccess('Profile updated. Changes will be visible upon next login.');
      },function(err){
         console.log(err);
      })
   };


   function getUnavailable(startInput,endInput) {

      var unavailable = $scope.available.filter(x => !x.checked).map(function(x) { 
         return { slotStart: new Date(x.slotStart), slotEnd: new Date(x.slotEnd) } 
      });
      var index = 0;
      while (index < unavailable.length-1) {
         if (unavailable[index].slotEnd.getHours() == unavailable[index+1].slotStart.getHours()) {
            unavailable[index].slotEnd = unavailable[index+1].slotEnd;
            unavailable.splice(index+1,1);
         } else {
            ++index;
         }
      }

      return unavailable;

   }

   function createUnavailableSlots(startInput,endInput,unavailable) {

      var startDate = new Date(startInput);
      var initDate = startDate.getDate();
      var initMonth = startDate.getMonth();
      var initYear = startDate.getFullYear();

      var endDate = new Date(endInput);
      var finDate = endDate.getDate();
      var finMonth = endDate.getMonth();
      var finYear = endDate.getFullYear();

      var numDays = Math.ceil((endDate - startDate) / (1000*60*60*24))+1;
      var persMtgs = [];

      for (var days = 0; days < numDays; ++days) {
         for (var i = 0; i < unavailable.length; ++i) {

            var unavailStart = unavailable[i].slotStart;            
            var start = new Date(initYear,initMonth,initDate,unavailStart.getHours());
            start.setDate(start.getDate()+days);

            var unavailEnd = unavailable[i].slotEnd;
            var endHours = unavailEnd.getHours();
            var end = new Date(initYear,initMonth,initDate,endHours);
            end.setDate(end.getDate()+days);
            if (endHours == 0) { end.setDate(end.getDate()+1); }

            persMtgs.push({ start:start, end:end });

         }
      }

      return persMtgs;

   }


   // On set-available button click, send availability to db
   $scope.setAvailable = function() {

      // TODO some personal day stuff:
      //    set personal to REPLY.PERSONAL = 2
      //    bring to frontend only for reminder
      //       and meeting calendar
      //    clear out each time new personal time is set

      var startInput = $('#date.start').val();
      var endInput = $('#date.end').val();
      if (startInput == '' || endInput == '')
         return formError('A date range must be selected.'); 

      var unavailable = getUnavailable(startInput,endInput);
      var persMtgs = createUnavailableSlots(startInput,endInput,unavailable);
      var availData = {
         user: $rootScope.currentUser,
         availability: persMtgs,
         subject: 'Unavailable',
         room: { Number: 0, Capacity: 1 }
      };

      // TODO figure out how to represent room in unavailable times
      profileFactory.putAvailability(availData).then(function(res) {
         formSuccess('Availability has be updated.');

         refreshAvailability();

      }, function(err) {
         console.log(err);
      });

   };

   // Convert db unavailable slot data to array format 
   var toUnavailableAry = function(data){
      var ary = [];

      if (data.length == 0){ 
         return ary; 
      }
      
      for (var key in data) {      
         if (  data.hasOwnProperty(key)  ){
            var newValue = {
               startDate: data[key].MeetingId.startDate,
               endDate: data[key].MeetingId.endDate,
            };
            ary.push(newValue);
         };
      }
      return ary;
   };

   // Get date range as string from database unavailablity data
   var toDateRangeString = function(data){
      if(data.length == 0){ return ''; }

      var initDate = new Date(data[0].MeetingId.startDate);
      var finalDate = new Date(data[data.length-1].MeetingId.startDate);
      var dateRangeStr = 'Current dates: From ' + initDate.toLocaleDateString()  + ' to ' + finalDate.toLocaleDateString();
      return dateRangeStr;
   };

   // Get all available and unavailable slots from database data 
   var getAllSlotsFromDb = function(data){
      if(data.length == 0){ return []; }

      // Get unavailable slots from day one
      var dayOneEnd = new Date(data[0].MeetingId.startDate);
      dayOneEnd.setDate(dayOneEnd.getDate()+1);
      var unavailableDayOneSlots = data.filter(function(x){
         return new Date(x.MeetingId.startDate) < dayOneEnd; 
      });
      
      // Populate availability array for all hours 
      var slots = [];
      for(var hour=0; hour<=23; hour++){
         var available = true;
         for(var i=0; i<unavailableDayOneSlots.length; i++){
            var start = new Date(unavailableDayOneSlots[i].MeetingId.startDate);
            var end = new Date(unavailableDayOneSlots[i].MeetingId.endDate);
            var startHr = start.getHours();
            var endHr = (end.getHours() == 0) ? 24 : end.getHours();

            if(startHr <= hour && hour < endHr){
               available = false;
               break;
            }
         }

         slots.push({checked: available});
      }

      return slots;
   }

   var refreshAvailability = function() {
      var id = $rootScope.currentUser.mid;
      profileFactory.getAvailability(id).then(function(res) {
         $scope.dateRangeStr = toDateRangeString(res.data);
         
         var available = getAllSlotsFromDb(res.data);
         if(available.length == 0){ 
            $scope.setAll();
         }
         else{
            for(var i=0; i<$scope.available.length; i++){
               $scope.available[i].checked = available[i].checked;
            }
         }
         
         // var unavail = res.data;
         // if(unavail.length == 0){ return; }
         
         

         return;
         
         
      },function(err) {
         console.log(err);
      });
   }

   // Refresh data in browser with data from db
   var refresh = function() {
      profileFactory.getEmployeeDetails($rootScope.currentUser.mid).then(function(response){
         $scope.form = response.data;
         // console.log(response.data);
         refreshAvailability();
      }), function(err){
         console.log(err);
      }


      // Initialize form input datetime widgets first
      $('#datetimepicker .date').datepicker({
        'format': 'm/d/yyyy',
        'autoclose': true,
      });

      var startDatetimepicker = document.getElementById('datetimepicker');
      var endDatetimepicker = new Datepair(startDatetimepicker, {
         'defaultDateDelta': 0
      });

   };
   
   // Initialize the page with data
   $(document).ready(refresh())
});


mainapp.factory('profileFactory', function($http){

   var factory = {};

   factory.getEmployeeDetails = function(id){
      return $http.post('/profile/details', {id: id});
   };

   factory.putProfileChanges = function(id, data){
      return $http.put('/profile/details/'+id, data);
   };

   factory.getAvailability = function(id) {
      return $http.get('/profile/available/'+id);
   }

   factory.putAvailability = function(data) {
      return $http.put('/profile/available', data);
   };

   return factory;

});
