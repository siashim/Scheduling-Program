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

   // On submit button click, send user profile to db
   $scope.submit = function(){
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
         // console.log(response.data);
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
      if (startInput == '' || endInput == '') { return; }

      var unavailable = getUnavailable(startInput,endInput);
      var persMtgs = createUnavailableSlots(startInput,endInput,unavailable);

      

   };

   // Refresh data in browser with data from db
   var refresh = function(){
      profileFactory.getEmployeeDetails($rootScope.currentUser.mid).then(function(response){
         $scope.form = response.data;
         // console.log(response.data);
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

   return factory;
});
