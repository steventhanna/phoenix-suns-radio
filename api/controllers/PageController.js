/**
 * PageController
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Server-side logic for managing the overall page that houses the site contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var marked = require('marked');

module.exports = {

  new: function(req, res) {
    var pageData = {
      pid: "phoenix-suns-radio",
      introText: "Welcome to Suns Talk Radio",
      broadcasts: [],
      blogs: [],
      about: ""
    };

    Page.create(pageData).exec(function(err, newPage) {
      if (err || newPage == undefined) {
        console.log("There was an error creating the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 0010");
        res.serverError();
      } else {
        console.log(newPage);
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
          currentPage.introText = post.introText;
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

  pageCreated: function(req, res) {
    Page.findOne({
      pid: 'phoenix-suns-radio'
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        // Create the page
        res.redirect('/page/create');
      } else {
        res.redirect('/dashboard');
      }
    });
  },
};