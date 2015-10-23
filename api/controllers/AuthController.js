/*()
 * AuthController
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Server-side logic for managing user authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  createAccount: function(req, res) {
    var post = req.body;

    var accountDetails = {
      email: post.email,
      password: post.password,
    };

    if (post.accessCode === "gorilla") {
      User.create(accountDetails).exec(function(err, user) {
        if (err || user == undefined) {
          console.log("There was an error creating the user account on the database.");
          console.log("Error = " + err);
          res.serverError();
        } else {
          req.logIn(user, function(err) {
            if (err) {
              console.log("There was an error when trying to login the user after the account was just created");
              console.log("Error = " + err);
              res.serverError();
            } else {
              console.log(user);
              // TODO :: Redirect user to admin page
              res.send({
                success: true
              });
            }
          });
        }
      });
    }
  },

  login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || (!user)) {
        console.log("user = " + user);
        console.log("err = " + err);
        console.log("info = ");
        console.log(info);

        res.send({
          success: false,
          error: true,
          errorMessage: "This user does not exist or there was some sort of error. ",
          info: info
        });
      } else if ((!err) && user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log("There was an error logging the user.");
            console.log("Error = " + err);
            console.log("Error Code 0002.0");
            console.log("Users Account: ");
            console.log(user);
            res.serverError();
            return;
          } else {
            res.send({
              success: true
            });
          }
        });
      } else {
        res.send({
          success: false
        });
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },
};