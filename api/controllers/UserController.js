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

};