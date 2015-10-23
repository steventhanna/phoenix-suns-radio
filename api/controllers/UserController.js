/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  admin: function(req, res) {
    res.view('admin/login');
  },

  createAccount: function(req, res) {
    res.view('admin/createAccount');
  },

  dashboard: function(req, res) {
    var post = req.body;
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
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
            // TODO :: Test this t osee if it even works.
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
              res.send({
                user: user,
                broadcasts: broadCastObj
              });
            }
            // TODO :: Check if the else if needs an else.
            // TODO :: Test if this is even the correct way of doing this.
            if (broadCastArr.length == broadCastObj.length) {
              res.send({
                user: user,
                // Broadcast obj should be empty
                broadCastObj: undefined;
              });
            }
          }
        });
      }
    });
  },

};