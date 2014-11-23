$(document).ready(function(){
  var $alert = $('<div class="alert"><button class="close" data-dismiss="alert">x</button></div>');
  var available_types = {
    error:   'alert-error' ,
    success: 'alert-success',
    info:    'alert-info'
  }

  function typeClass(type) {
    type && available_types[type] || '';
  }

  bootstrap_alert = function(message, type) {
    return $alert.clone().append(message).addClass(typeClass(type));
  }

  window.notify_submit = function(msq) {
    $('#output_space').html(bootstrap_alert(msq));
  }
});
