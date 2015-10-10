$(document).ready(function() {
  $("#loginButton").click(function() {
    var username = $("#username").val();
    var password = $("#password").val();

    var postObj = {
      username: username,
      password: password
    };

    $.ajax({
      type: 'POST',
      url: '/login',
      data: postObj,
      success: function(data) {
        console.log(data);
        alert("Success");
      },
      error: function(data) {
        console.log(data);
        alert('Error');
      }
    });
  });
});