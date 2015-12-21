$(document).ready(function() {
  $("#saveUserButton").click(function() {

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#username").val();
    var password = $("#password").val();
    var passwordConfirmtation = $("#password-confirmation").val();

    var postObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    if (password !== null && password !== " " && password === passwordConfirmtation) {
      postObj.password = password;
    }

    console.log(postObj);
    $.ajax({
      type: 'POST',
      url: '/user/edit',
      data: postObj,
      success: function(data) {
        if (data.success == true) {
          swal({
            title: "Success!",
            text: "User information has been updated.",
            type: "success",
            showCancelButton: false,
            closeOnConfirm: false
          }, function() {
            window.location.reload();
          });
        } else {
          console.log("1");
          swal("Uh-Oh!", "The user information could not be updated.", "error");
        }
      },
      error: function(data) {
        console.log("2");
        swal("Uh-Oh!", "The user information could not be updated.", "error");
      }
    });
  });
});