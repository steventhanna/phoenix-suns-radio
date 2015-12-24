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
      username: post.username,
      password: post.password,
      firstName: post.firstName,
      lastName: post.lastName,
      displayName: post.firstName + " " + post.lastName
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
                success: true,
                status: 200
              });
            }
          });
        }
      });
    } else {
      console.log("Access code not correct... Eventually change this");
      res.serverError();
    }
  },

  login: function(req, res) {
    console.log(req.body);
    var user = req.body;
    passport.authenticate('local', function(err, user, info) {
      if (err || (!user)) {
        console.log("user = " + user);
        console.log("err = " + err);
        console.log("info = ");
        console.log(info);
        res.send({
          success: false,
          user: undefined,
          error: true,
          errorMessage: err,
          info: info,
          status: 500,
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
              user: user,
              success: true,
              status: 200
            });
          }
        });
      } else {
        res.send({
          user: undefined,
          success: false,
          status: 500,
        });
        res.serverError();
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },
};