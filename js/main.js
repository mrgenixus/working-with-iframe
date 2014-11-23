$(document).ready(function() {
  var $output = $('#output');

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

  var add_message = (function() {
    var count = 0;
    return function add_message(markup) {
      $output
        .children()
          .slice(2)
            .remove()
          .end()
        .end()
      .prepend($(markup).prepend("Event: " + (++count).toString() + ": "));
    }
  })();

  function hander(operation, name) {
    return function() {
      if(operation.click($('#handle')[0].contentDocument,operation)) {
        add_message(bootstrap_alert(operation.message,'success'));
      } else {
        add_message(bootstrap_alert(operation.message || ("'" + name + "' failed"), 'error'));
      }
    }
  }

  var call_on_iframe = function(function_ref) {
    function_ref.call($('#handle')[0].contentWindow);
  }

  $.each({
    'add field':{
      click:function(idocument,parent) {
        $(idocument.getElementById('form1')).append('<label id="value2"> value2 <input type="text" name=data[meta-model][value2]></label>');
        parent.message = '<strong>Sucess:</strong> Field added';
        return $(idocument).find('#value2').length;
      }
    },
    'remove field':{
      click:function(idocument,parent) {
        var $form1 = $(idocument.getElementById('form1'));
        var field_found = function() {
          return $form1.find('#value2').length;
        }

        var rval = false;
        parent.message = "<strong>Failure:</strong> Field Not Found";

        if(field_found()) {

          $form1.find('#value2').remove();

          if( field_found()) {
            rval = false;
            parent.message = "<strong>Failure:</strong> Field Not Removed";
          } else {
            rval = true;
            parent.message = "<strong>Success:</strong> Field Removed";
          }
        }
        return rval;
      }
    },
    'attach event':{
      click:function(idocument,parent) {
        var $action_button = $(idocument.getElementById('action_button'));
        //replace existing function to prepend code

        var new_action_function = function() {
          add_message(bootstrap_alert('<strong>Notify:</strong> action button, clicked'));
        }
        $action_button.on('click.iframe',new_action_function)
        parent.message = "<strong>Success</strong> click helper applied";
        return $action_button.length

      }
    },
    'detach event':{
      click:function(idocument,parent) {
        var $action_button = $(idocument.getElementById('action_button'));
        $action_button.off('.iframe');
        parent.message = "<strong>Success</strong> All events removed from action button";
        return true;
      }
    }

  }, function(button_text, operation) {
    if($.isFunction(operation.click)) {
      var $button = $('<button class="btn span2">')
        .html(button_text)
        .on('click.parentframe',hander(operation, button_text));
      $('#example-bar').append($button);
    }
  })

})


