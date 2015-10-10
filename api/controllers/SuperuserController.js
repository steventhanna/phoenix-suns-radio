/**
 * SuperuserController
 *
 * @description :: Server-side logic for managing superusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    var url = req.url;
    var username = (url.substring('/superuser/create'.length));

    if (username == "" || username == " " || username == undefined) {
      res.serverError();
      console.log("There was an error with the choosen superuser username");
    } else {
      User.create({
        username: username,
        password: "unicorn"
      }).exec(function(err, user) {
        if (err || user == undefined) {
          console.log("There was an error creating the superuser account.");
          console.log("Error = " + err);
          res.serverError();
        } else {
          console.log("Successfully created the new superuser with default password.");
          res.redirect('/admin');
        }
      });
    }
  }
};