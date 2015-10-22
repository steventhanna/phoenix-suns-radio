$(document).ready(function() {
  $("#loginButton").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();

    var postObj = {
      email: email,
      password: password
    };
    console.log(postObj);

    $.ajax({
      type: 'POST',
      url: '/login',
      data: postObj,
      success: function(data) {
        console.log(data);
        if (data.success == true) {
          swal("Success", "You have been logged in.", "success");
        } else {
          swal("Uh-Oh!", "The account could not be logged in.", "error");
        }

      },
      error: function(data) {
        console.log(data);
        swal("Uh-Oh!", "The account could not be logged in.", "error");
      }
    });
  });
});