
    $(document).ready(function(){
      var $output = $('#output');
      bootstrap_alert = function(message,type){
        var available_types = {'error':'alert-error','success':'alert-success','info':'alert-info'}
        if (type != undefined && type in available_types) type = available_types[type] ; else type = '';

        var $alert = $('<div class="alert ' + type + '">');
        $alert.append($('<button class="close" data-dismiss="alert">x</button>'));
        return $alert.append(message);
      }

      var call_on_iframe = function(function_ref){

        function_ref.call($('#handle')[0].contentWindow);
      }

      $.each({
        'add field':{
          click:function(idocument,parent){
            $(idocument.getElementById('form1')).append('<label id="value2"> value2 <input type="text" name=data[meta-model][value2]></label>');
            parent.message = '<strong>Sucess:</strong> Field added';
            return $(idocument).find('#value2').length;
          }
        },
        'remove field':{
          click:function(idocument,parent){
            var $form1 = $(idocument.getElementById('form1'));
            var field_found = function() {
              return $form1.find('#value2').length;
            }

            var rval = false;
            parent.message = "<strong>Failure:</strong> Field Not Found";

            if(field_found()){

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
          click:function(idocument,parent){
            var $action_button = $(idocument.getElementById('action_button'));
            //replace existing function to prepend code

          var new_action_function = function(){
            $output.append(bootstrap_alert('<strong>Notify:</strong> action button, clicked'));
          }
          $action_button.on('click.iframe',new_action_function)
          parent.message = "<strong>Success</strong> click helper applied";
          return $action_button.length

          }
        },
        'detach event':{
          click:function(idocument,parent){
            var $action_button = $(idocument.getElementById('action_button'));
            $action_button.off('.iframe');
            parent.message = "<strong>Success</strong> All events removed from action button";
            return true;
          }
        }

      },function(i,v){
        if(v.click != undefined){
        $('#example-bar')
          .append($('<button>')
            .html(i)
            .on('click.parentframe',function(){
              if(v.click($('#handle')[0].contentDocument,v)){
                $output.html(bootstrap_alert(v.message,'success'));
              } else {
                if (v.message == undefined || v.message == '') var message = "'" + i + "' failed"; else message = v.message;
              $output.html(bootstrap_alert(message, 'error'));
              }
            })
          );
        }

      })

    })


