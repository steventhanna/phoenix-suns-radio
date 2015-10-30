$(document).ready(function() {
  $("#editBroadcastButton").click(function() {
    var title = $("#title").val();
    var date = document.getElementById("date").value;
    var summary = document.getElementById("summary").value;
    var embedCode = document.getElementById("embedCode").value;
    var bid = document.getElementById("bid").innerHTML;
    console.log(bid);

    var postObj = {
      bid: bid,
      title: title,
      date: date,
      summary: summary,
      embedCode: embedCode
    };

    $.ajax({
      type: 'POST',
      url: '/broadcast/edit',
      data: postObj,
      success: function(data) {
        if (data.success == true) {
          swal({
            title: "Success!",
            text: "The broadcast has been updated.",
            type: "success"
          }, function() {
            window.location.reload();
          });
        } else {
          swal("Uh-Oh!", "There was an error editing the broadcsat.", "error");
        }
      },
      error: function(data) {
        swal("Uh-Oh!", "There was an error editing the broadcsat.", "error");
      }
    });
  });

  $("#deleteBroadcastButton").click(function() {
    var bid = document.getElementById("bid").innerHTML;

    var postObj = {
      bid: bid
    };

    // Check if the user really wants to get rid of it
    swal({
        title: "Are you sure?",
        text: "Do you really want to delete the broadcast?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderConfirm: true,
      },
      function() {
        setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: '/broadcast/delete',
            data: postObj,
            success: function(data) {
              if (data.success == true) {
                swal({
                  title: "Success!",
                  text: "The broadcast has been deleted.",
                  type: "success",
                }, function() {
                  window.location.href = "/broadcasts";
                });
              } else {
                swal("Uh-Oh!", "There was an error deleting the broadcast.", "error");
              }
            },
            error: function(data) {
              swal("Uh-Oh!", "There was an error deleting the broadcast.", "error");
            }
          });
        });
      });
  });
});