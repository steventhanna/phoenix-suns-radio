$(document).ready(function() {
  $("#updateAboutButton").click(function() {
    var aboutText = document.getElementById("aboutText").value;
    var postObj = {
      about: aboutText,
    };

    $.ajax({
      type: 'POST',
      url: '/page/about',
      data: postObj,
      success: function(data) {
        console.log(data);
        swal({
          title: "Success!",
          text: "About Text has been updated.",
          type: "success",
        }, {
          function() {
            window.location.reload();
          }
        });
      },
      error: function(data) {
        console.log(data);
        swal("Uh-Oh!", "The text could not be updated.", "error");
      }
    });
  });
});