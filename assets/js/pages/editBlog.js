$(document).ready(function() {

  // Init the editor
  var editor = new MediumEditor('.editable', {
    toolbar: {
      /* These are the default options for the toolbar,
               if nothing is passed this is what is used */
      allowMultiParagraphSelection: true,
      buttons: [
        'bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote'
      ],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      standardizeSelectionStart: false,
      static: false,

      /* options which only apply when static is true */
      align: 'center',
      sticky: false,
      updateOnEmptySelection: false
    },
    spellcheck: true,
  });

  $("#deleteBlogButton").click(function() {

  });

  $("#saveBlogButton").click(function() {
    // Get the contents
    var data = editor.serialize();
    var blid = document.getElementById("blid").innerHTML;
    var blogContents = data['editor'].value;
    var title = $("#title").val();
    var errors = false;
    if (title == undefined || title == " ") {
      swal("Uh-oh!", "No blog title entered.", "error");
      errors = true;
    }
    console.log(title);
    if (blogContents == undefined || blogContents == " ") {
      swal("Uh-oh!", "No contents for the blog was entered.", "error");
      errors = true;
    }
    console.log(blogContents);
    if (errors == false) {
      var postObj = {
        title: title,
        blid: blid,
        contents: blogContents
      };
      $.ajax({
        type: 'POST',
        url: '/blog/edit',
        data: postObj,
        success: function(data) {
          if (data.success == false) {
            swal("Uh-oh", "There was an error creating a new blog post.", "error");
          } else {
            swal({
              title: "Success!",
              text: "The blog post has been successfully updated.",
              type: "success",
              showCancelButton: false,
              closeOnConfirm: false
            }, function() {
              window.location.href = '/blog-settings';
            });
          }
        },
        error: function(data) {
          swal("Uh-oh", "There was an error creating a new blog post.", "error");
        }
      });
    }
  });
});