/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    //The User's email address, also used as the username on the site
    email: {
      required: true,
      type: 'email',
      unique: true
    },

    //Stored a hashed version of the user's password
    password: {
      required: true,
      type: 'string'
    },

    //The users first name (given name)
    firstName: {
      type: 'string'
    },

    //The user's last name (Family name)
    lastName: {
      type: 'string'
    },

    //Remove the password before it is returned as a JSON object
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  //Hash the password before it is ever stored in the database
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};