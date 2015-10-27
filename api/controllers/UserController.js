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
          user.email = post.email;
          changes = true;
        }
        if (post.password != undefined && post.password !== " ") {
          user.password = post.password;
          changes = true;
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

  /**
   * Handle the dashboard request
   */
  // TODO :: Send broadcasts in the correct sorted order.
  dashboard: function(req, res) {
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
        res.view('admin/dash', {
          user: user
        });
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
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
            var pageData = {
              pid: "phoenix-suns-radio",
              broadcasts: [],
              blogs: [],
              about: ""
            };

            Page.create(pageData).exec(function(err, newPage) {
              if (err || newPage == undefined) {
                console.log("There was an error creating the overall page.");
                console.log("Error = " + err);
                console.log("Error Code: 0010");
              } else {
                // res.send({
                //   success: true,
                // });
                currentPage = newPage;
              }
            });
          } else {
            // Get total amount of broadcasts
            var totalBroadcasts = currentPage.broadcasts.length;
            res.view('admin/dash', {
              user: user,
              totalBroadcasts: totalBroadcasts
            });
          }
        });
      }
    });
  },

  broadcast: function(req, res) {
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
            var broadcastList = currentPage.broadcasts;
            var broadObj = [];
            if (broadcastList.length > broadObj.length) {
              for (var i = 0; i < broadcastList.length; i++) {
                Broadcast.findOne({
                  bid: broadcastList[i]
                }).exec(function(err, currentBroadcast) {
                  if (err || currentBroadcast == undefined) {
                    console.log("There was an error looking up the current broadcast");
                    console.log("Error = " + err);
                    console.log("Error CodeL 00003");
                    res.serverError();
                  } else {
                    broadObj.push(currentBroadcast);
                  }
                });
              }
              if (broadcastList.length == broadObj.length) {
                res.view('admin/broadcasts', {
                  user: user,
                  broadcasts: broadObj,
                  currentPage: 'broadcasts'
                });
              }
            } else if (broadcastList.length == broadObj.length) {
              res.view('admin/broadcasts', {
                user: user,
                broadcasts: broadObj,
                currentPage: 'broadcasts'
              });
            } else {
              res.view('admin/broadcasts', {
                user: user,
                broadcasts: undefined,
                currentPage: 'broadcasts'
              });
            }
          }
        });
      }
    });
  },
};