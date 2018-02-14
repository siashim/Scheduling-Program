mainapp.controller('logoutCtrl', function($rootScope, $scope){
   $scope.setCookie('empId',$rootScope.currentUser,-1);
   $rootScope.currentUser = null;
});