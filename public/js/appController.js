mainapp.controller('mainCtrl', function ($scope, $rootScope, $http, $state, $timeout){
   window.onload = function(){
      var lastUser = getCookie('empId');
      if(lastUser != ''){
         $rootScope.currentUser = JSON.parse(lastUser);
         $timeout(function(){
            $state.go('home');
         });
      }
   }
   
   // Set cookie to remember user after page refresh
   $scope.setCookie = function(cname,cvalue,exmins) {
      var d = new Date();
      d.setTime(d.getTime() + (exmins*60*1000));
      var expires = ";expires=" + d.toGMTString(); // 
      document.cookie = cname + "=" + JSON.stringify(cvalue) + expires + ";path=/";
   }

   function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
      }
      return "";
   }
});