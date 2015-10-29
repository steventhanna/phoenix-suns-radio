$(document).ready(function() {
  $("#addBroadcastButton").click(function() {
    var title = $("#title").val();
    var date = document.getElementById("date").value;
    var summary = document.getElementById("summary").value;
    var embedCode = document.getElementById("embedCode").value;

    var error = false;

    if (title == undefined) {
      error = true;
    }
    if (date == undefined) {
      error = true;
    }
    if (summary == undefined) {
      error = true;
    }
    if (embedCode == undefined) {
      error = true;
    }

    if (error == false) {
      var postObj = {
        title: title,
        date: date,
        summary: summary,
        embedCode: embedCode
      };

      $.ajax({
        type: 'POST',
        url: '/broadcast/new',
        data: postObj,
        success: function(data) {
          if (data.success == true) {
            window.location.reload();
          } else {
            swal("Uh-Oh!", "There was an error creating the new broadcsat.", "error");
          }
        },
        error: function(data) {
          swal("Uh-Oh!", "There was an error creating the new broadcsat.", "error");
        }
      });
    } else {
      swal("Uh-Oh!", "One or more input fields have been left blank.", "error");
    }
  });
});