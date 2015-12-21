/**
 * UserController
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Server-side logic for managing users and their corresponding pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Serve the admin login page
   */
  admin: function(req, res) {
    res.view('admin/login');
  },

  /**
   * Serve the admin create account page
   */
  createAccount: function(req, res) {
    res.view('admin/createAccount');
  },

  /**
   * Handle the editAccount request
   */
  // TODO :: Check hashing for changing password
  editAccount: function(req, res) {
    var post = req.body;
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        var changes = false;
        if (post.email != undefined && post.email !== " ") {
          user.username = post.email;
          changes = true;
        }
        if (post.password != undefined && post.password !== " " && post.password !== "" && post.password != null) {
          user.password = post.password;
          changes = true;
        } else {
          console.log("No password updates");
        }
        user.firstName = post.firstName;
        user.lastName = post.lastName;
        user.displayName = post.firstName + " " + post.lastName;
        if (changes == true) {
          user.save(function(err) {
            if (err) {
              console.log("There was an error saving the new user information.");
              console.log("Error = " + err);
              console.log("Error Code: 00011");
              res.send({
                success: false,
                error: true,
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

  overview: function(req, res) {
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        Page.findOne({
          pid: 'phoenix-suns-radio'
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the page.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            res.view('admin/dash', {
              user: user,
              page: currentPage,
              currentPage: 'dashboard',
              currentSidebar: 'overview'
            });
          }
        });
      }
    });
  },

  broadcast: function(req, res) {
    var post = req.body;
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        Page.findOne({
          pid: 'phoenix-suns-radio'
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            // Do the async shit
            var broadcasts = [];
            Broadcast.find({}).exec(function findCB(err, found) {
              while (found.length) {
                broadcasts.push(found.pop());
              }
              res.view('admin/broadcasts', {
                user: user,
                page: currentPage,
                broadcasts: broadcasts,
                currentPage: 'dashboard',
                currentSidebar: 'broadcasts'
              });
            });
          }
        });
      }
    });
  },

  aboutSettings: function(req, res) {
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        Page.findOne({
          pid: 'phoenix-suns-radio'
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            res.view('admin/about', {
              user: user,
              page: currentPage,
              about: currentPage.about,
              currentPage: 'dashboard',
              currentSidebar: 'about-settings'
            });
          }
        });
      }
    });
  },

  settings: function(req, res) {
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        res.view('admin/settings', {
          user: user,
          currentPage: 'settings'
        });
      }
    });
  },

  blog: function(req, res) {
    Page.findOne({
      pid: "phoenix-suns-radio"
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the page.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        // Get the blog
        var blogs = [];
        Blog.find({}).exec(function findBlog(err, found) {
          while (found.length) {
            blogs.push(found.pop());
          }
          res.view('landing/blog', {
            currentPage: 'blog',
            blogs: blogs
          });
        });
      }
    });
  },
};