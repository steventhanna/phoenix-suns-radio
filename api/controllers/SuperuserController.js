/**
 * SuperuserController
 *
 * @description :: Server-side logic for managing superusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  create: function(req, res) {
    var url = req.url;
    var email = (url.substring('/superuser/create/'.length));

    if (email == "" || email == " " || email == undefined) {
      res.serverError();
      console.log("There was an error with the choosen superuser email");
    } else {
      User.create({
        email: email,
        password: "unicorn"
      }).exec(function(err, user) {
        if (err || user == undefined) {
          console.log("There was an error creating the superuser account.");
          console.log("Error = " + err);
          res.serverError();
        } else {
          console.log(email);
          console.log("Successfully created the new superuser with default password.");
          res.redirect('/admin');
        }
      });
    }
  }
};