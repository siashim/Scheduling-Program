

function meetingConflicts(candidateMtgs,startDateTime,endDateTime) {
   var roomConflicts = candidateMtgs.find(function(x) {
      var start = new Date(x.startDate);
      var end = new Date(x.endDate);
      if ((startDateTime >= start && startDateTime < end) ||
         (endDateTime > start && endDateTime <= end) ||
         (startDateTime <= start && endDateTime >= end)) 
      {
         return true;
      }
   });
   return roomConflicts != undefined;
}

