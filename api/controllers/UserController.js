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
            var list = currentPage.broadcasts;
            console.log(list.length);
            if (list.length == 0) {
              if (list.length == broadcastList.length) {
                res.view('admin/broadcasts', {
                  user: user,
                  page: currentPage,
                  broadcasts: undefined
                });
              }
            } else {
              var broadcastList = [];
              if (list.length > broadcastList.length) {
                for (var i = 0; i < list.length; i++) {
                  console.log(list[i]);
                  Broadcast.findOne({
                    bid: list[i]
                  }).exec(function(err, currentBroadcast) {
                    if (err || currentBroadcast == undefined) {
                      console.log("There was an error looking up the broadcast.");
                      console.log("Error = " + err);
                      console.log("Error Code: 0003");
                      res.serverError();
                    } else {
                      broadcastList.push(currentBroadcast);
                      if (list.length == broadcastList.length) {
                        res.view('admin/broadcasts', {
                          user: user,
                          page: currentPage,
                          broadcasts: broadcastList
                        });
                      }
                    }
                  });
                }
              } else {
                res.view('admin/broadcasts', {
                  user: user,
                  page: currentPage,
                  broadcasts: broadcastList
                });
              }
            }
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
};