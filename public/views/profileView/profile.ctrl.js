mainapp.controller('profileCtrl', function ($scope, $rootScope, profileFactory){
   $scope.form = {};
   $scope.available = createAvailable();

   function createAvailable(){
      var ary = [];
      for (var i=0; i<=23; i++){
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

   // On set-available button click, send availability to db
   $scope.setAvailable = function(){

      console.log(JSON.stringify($scope.form))
   };

   // Refresh data in browser with data from db
   var refresh = function(){
      profileFactory.getEmployeeDetails($rootScope.currentUser.mid).then(function(response){
         $scope.form = response.data;
         // console.log(response.data);
      }), function(err){
         console.log(err);
      }
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
