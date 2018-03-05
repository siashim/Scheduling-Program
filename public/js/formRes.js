



var formError = function(msg) {
    $('#formResponse').empty();
    $('#formResponse').append(
       '<div class="alert alert-danger">'+ 
       ' <strong>Error! </strong> ' +
       msg + '</div>');
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


