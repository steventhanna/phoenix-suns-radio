/**
 * LandingController
 *
 * @description :: Server-side logic for managing landings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {
    // TODO :: lookup blog
    res.view('landing/home', {
      currentPage: 'home'
    });
  },

  social: function(req, ers) {
    res.view('landing/social', {
      currentPage: 'social'
    });
  },

  about: function(req, res) {
    Page.findOne({
      pid: 'phoenix-suns-radio'
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the page... Perhaps it was never created.");
        console.log("Error = " + err);
        res.view('landing/about', {
          currentPage: 'about',
          about: undefined
        });
      } else {
        res.view('landing/about', {
          currentPage: 'about',
          about: currentPage.about,
        });
      }
    });
  },

  testAdmin: function(req, res) {
    res.view('admin/dash');
  }

};