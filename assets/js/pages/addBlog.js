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
    placeholder: {
      text: "Write your post here"
    }
  });


  $("#addBlogButton").click(function() {
    // Get the contents
    editor.selectAllContents();
    var contents = editor.exportSelection();
    console.log(contents);
    console.log(editor.selectAllContents());
  });

  $("#updateAboutButton").click(function() {
    var aboutText = document.getElementById("aboutText").value;
    var title = $("#introText").val();
    var postObj = {
      about: aboutText,
      introText: title,
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