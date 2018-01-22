mainapp.controller('adminRoomCtrl', function($scope, adminRoomFactory, adminRoomService){
   
   $scope.rooms = []
   $scope.roomModal = {}
   
   // When the view button is clicked, open an alert messagebox
   $scope.viewRoom = function(room, id){
      adminRoomFactory.getRoom(id).then(function(response){
         alert(adminRoomService.roomToString(response.data));
      }), function(err){
         console.log(err);
      }
	} 
   
   // When the update button is clicked, open a modal dialog for data entry
   $scope.updateRoomDialog = function(number, id){
      adminRoomFactory.getRoom(id).then(function(response){
         $scope.roomModal = adminRoomService.setRoomModalData(response.data);
         $('#roomModal').modal({});
      }), function(err){
         console.log(err);
      }
	} 

   // Send update data to db
   $scope.updateRoom = function(){
      var id = $scope.roomModal.id;
      var data = adminRoomService.getRoomModalData();
      adminRoomFactory.putRoom(id, data).then(function(response){
         refresh();
      }), function(err){
         console.log(err);
      }
   }

   // When the delete button is clicked, open a confirmation messagebox
   $scope.deleteRoom = function(roomnum, id){
      var deleteMsg = adminRoomService.confirmDeleteMsg(roomnum);
      var result = confirm(deleteMsg);
      if (result === true){
         adminRoomFactory.deleteRoom(id).then(function(){
            refresh();
         }), function(err){
            console.log(err);
         }
      }
	}

   // When the create button is clicked, post data to the db
   $scope.createRoom = function(){
      var data = adminRoomService.getCreateRoomData();
      adminRoomFactory.postRoom(data).then(function(){
         refresh();
      }), function(err){
         console.log(err);
      }
	}

   // Refresh data in browser with data from db
   var refresh = function(){
      adminRoomFactory.getAllRooms().then(function(response){
         $scope.rooms = response.data; 
      }), function(err){
         console.log(err);
      }
   }

   // Initialize the table with data
	$(document).ready(refresh())
})