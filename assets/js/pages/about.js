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

        if (data.success == true) {
          swal({
            title: "Success!",
            text: "About Text has been updated.",
            type: "success",
            showCancelButton: false,
            closeOnConfirm: false
          }, function() {
            window.location.reload();
          });
        } else {
          swal("Uh-Oh!", "The text could not be updated.", "error");
        }
      },
      error: function(data) {
        console.log(data);
        swal("Uh-Oh!", "The text could not be updated.", "error");
      }
    });
  });
});