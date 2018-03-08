

var formError = function(msg) {
   $('#formResponse').empty();
   $('#formResponse').append(
      '<div class="alert alert-danger"> ' + 
      '<strong>Error! </strong> ' +
      msg + '</div>');
   return false;
}


var formInfo = function(msg) {
   $('#formInfo').empty();
   $('#formInfo').append(
      '<div class="alert alert-info"> ' +
      msg + '</div>');
   return true;
}


var formWarning = function(msg) {
    $('#formResponse').empty();
    $('#formResponse').append(
        '<div class="alert alert-warning fade in">'+
        '<span class="close" data-dismiss="alert">&times;</span>'+
        '<strong>Warning!</strong> '+
        msg+'</div>');
    return false;
}


var formSuccess = function(msg) {
   $('#formResponse').empty();
   $('#formResponse').append(
      '<div class="alert alert-success"> '+
      '<strong> Success! </strong> '+
      msg + ' </div>');
   return true;
}

