$(document).ready(function() {


  $("#loginButton").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();

    var postObj = {
      username: email,
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
          window.location.href = "/dashboard";
        } else {
          if (data.errorMessage == "INVALID PASSWORD") {
            swal("Uh-Oh!", "The username or password is not correct.", "error");
          } else {
            swal("Uh-Oh!", "The account could not be logged in.", "error");
          }
        }
      },
      error: function(data) {
        console.log(data);
        swal("Uh-Oh!", "The account could not be logged in.", "error");
      }
    });
  });
});