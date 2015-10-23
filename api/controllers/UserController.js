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
        // User retrieved
        // Get Page
        Page.findOne({
          pid: post.pid
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
          } else {
            // Look up all the broadcasts
            // TODO :: Test this to see if it even works.
            var broadcastArr = currentPage.broadcasts;
            var broadCastObj;
            if (broadCastArr.length > broadCastObj.length) {
              for (var i = 0; i < broadCastArr.length; i++) {
                Broadcast.findOne({
                  bid: boradCastArr[i]
                }).exec(function(err, currentBroadcast) {
                  if (err || currentBroadcast == undefined) {
                    console.log("There was an error looking up the current broadcast");
                    console.log("Error = " + err);
                    console.log("Error CodeL 00003");
                  } else {
                    broadCastObj.push(currentBroadcast);
                  }
                })
              }
            } else if (broadCastArr.length == broadCastObj.length) {
              // Send to the page
              res.view('dashboard/dash', {
                user: user,
                broadcasts: broadCastObj
              });
            }
            // TODO :: Check if the else if needs an else.
            // TODO :: Test if this is even the correct way of doing this.
            if (broadCastArr.length == broadCastObj.length) {
              res.view('dashboard/dash', {
                user: user,
                // Broadcast obj should be empty
                broadCastObj: undefined
              });
            }
          }
        });
      }
    });
  },

};