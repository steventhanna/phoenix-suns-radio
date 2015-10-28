$(document).ready(function() {
  $("#createAccountButton").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var passwordConfirmation = $("#confirm-password").val();
    var accessCode = $("#access-code").val();

    // Check inputs exist
    if (email == null || email == undefined || email == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }
    if (password == null || password == undefined || password == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }

    if (firstName == null || firstName == undefined || firstName == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }

    if (lastName == null || lastName == undefined || lastName == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }

    if (passwordConfirmation == null || passwordConfirmation == undefined || passwordConfirmation == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }

    if (accessCode == null || accessCode == undefined || accessCode == " ") {
      swal("Uh-Oh!", "Some fields were left blank.", "error");
    }

    // Check if passwords match
    var error = false;
    if (password !== passwordConfirmation) {
      error = true;
      swal("Uh-Oh!", "Your passwords do not match.", "error");
    }

    if (error == false) {
      var postObj = {
        username: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        accessCode: accessCode
      };
      $.ajax({
        type: 'POST',
        url: '/create-account',
        data: postObj,
        success: function(data) {
          console.log(data);
          swal("Success", "The account has successfully been created!", "success");
          window.location.href = "/dashboard";
        },
        error: function(data) {
          console.log(data);
          swal("Uh-Oh!", "The account could not be created.", "error");
        }
      });
    }
  });
});