/*
*Copyright@2019
* Author: Zweli Mthethwa
*/
jQuery('.scroll_to').click(function(e){
    e.preventDefault();
    var jump = $(this).attr('href');

    var new_position = $(jump).offset();

    $('html, body').stop().animate({ scrollTop: new_position.top }, 500);
});

$(document).ready(function(){
    $('send_btn').click(function(e){
        console.log("send button clicked");
        e.preventDefault();
        sendEmail();
    });
});
function sendEmail(){
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();
    var errors = [];
    if(name == null){
        errors.push("The name is required");
    }
    if(email.length == 0){
        errors.push("The email is required");
    }
    if(message.length == 0){
        errors.push("message is required");
    }
    //remember to do regex for the email
    if(errors.length > 0){
        for(let i = 0; i < errors.length; i++){
            $('#email_error').append(errors[i]+'<br>');
        }
    }
    $.ajax({
    type: 'POST',
    url: 'controllers/sendEmail.php',
    data: {
      name: name,
      message: message,
      email: email,
    },
    success: function(response){
      var data = response;
      console.log("response data===>");
      console.log(data);
      if(data== 1){
        console.log(response);
        console.log("Email successfully sent ");
      }else{
        console.log("There was a problem on the server");
      }
    },
    failure: function(response){
      console.log(response);
    }
  });
}
