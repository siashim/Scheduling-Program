mainapp.controller('responseCtrl', function($scope, $stateParams, $http){
   $scope.meeting = $stateParams.meeting
   $scope.responses = [];
   var mid = $stateParams.meeting._id

   // On back button click, go back
   $scope.goBack = function(){
      window.history.back();
   };

   // Refresh data in browser with data from db
   var refresh = function(){
      $http.get('/response', { params: { mid: mid }}).then(function(res){
         $scope.responses = parseToViewFormat(res.data);
      }, function(err){
         console.log(err);
      });
   };

   // Convert from database format to local view format
   var parseToViewFormat = function(data){
      var ary = [];
      for (var key in data) {      
         if (  data.hasOwnProperty(key)  ){
            var newValue = {
               name: data[key].EmployeeId.FirstName + ' ' + data[key].EmployeeId.LastName,
               eid: data[key].EmployeeId.EmployeeId,
               position: data[key].EmployeeId.Position,
               status: statuses[data[key].Status],
            };
            ary.push(newValue);
         };
      }
      return ary;
   };
   
   var statuses = {
      '-1' : {text: 'Declined', icon: 'fa fa-close', style: {color:'red'}, alert: "alert alert-danger"},
      '0' : {text: 'Not responded', icon: 'fa fa-ellipsis-h', style: {color:'grey'}, alert: "alert alert-light"},
      '1' : {text: 'Accepted', icon: 'fa fa-check', style: {color:'green'}, alert: "alert alert-success"},
   };

   // Initialize the page with data
   $(document).ready(refresh())
});