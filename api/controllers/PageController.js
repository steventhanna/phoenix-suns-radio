/**
 * PageController
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Server-side logic for managing the overall page that houses the site contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
    var post = req.body;

    var pageData = {
      pid: "phoenix-suns-radio",
      broadcasts: [],
      about: "";
    };

    Page.create(pageData).exec(function(err, newPage) {
      if (err || newPage == undefined) {
        console.log("There was an error creating the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 0010");
      } else {
        res.send({
          success: true,
        });
      }
    });
  },

  editAbout: function(req, res) {
    var post = req.body;
    Page.findOne({
      pid: 'phoenix-suns-radio'
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 00002");
      } else {
        if (post.about != undefined && post.about !== " ") {
          currentPage.about = post.about;
          currentPage.save(function(err) {
            if (err) {
              console.log("There was an error saving the overall page with about information.");
              console.log("Error = " + err);
              console.log("Error Code: 0011");
              res.send({
                success: false,
                error: true
              });
            } else {
              res.send({
                success: true
              });
            }
          });
        }
      }
    });
  },
};