// Helper functions for admin-room view
mainapp.service('adminRoomService',function(){
   // Accessors
   this.getCreateRoomData = function(){
      var data = {
         Number: document.getElementById("rnum").value,
         Capacity: document.getElementById("rcap").value
      };
      return data;
   }
   this.getRoomModalData = function(){
      var value = {
         number: document.getElementById("dianum").value,
         capacity: document.getElementById("diacap").value,
      }
      return value;
   }
   this.setRoomModalData = function(data){
      var value = {
            number: data.Number,
            capacity: data.Capacity,
            id: data._id
      }
      return value;
   }

   // Strings
   this.confirmDeleteMsg = function(name){
      return "Are you sure you want to delete room " + name + "?";
   }
   this.roomToString = function(data){
      return 'Number: ' + data.Number + '\n' +  
             'Capacity: ' + data.Capacity + '\n'
   }
})