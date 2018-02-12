mainapp.controller('loginCtrl', function($scope, $rootScope, $state, loginFactory){
   
   // On Login button click, send Form data and handle response
   $scope.formSubmit = function(){
      var data = {
         username: $scope.username,
         password: $scope.password,
      }
      loginFactory.getLogin(data).then(function(response){
         $rootScope.currentUser = response.data;
         if(response.data.isLoggedIn == true){
            $state.go('home');
         }
      }), function(err){
         console.log(err);
      }
   }
})

mainapp.factory('loginFactory', function($http){
   var factory = {}

   factory.getLogin = function(data){
      return $http.post('/login', data);
   }

   return factory;
})
