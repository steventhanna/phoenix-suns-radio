/**
 * LandingController
 *
 * @description :: Server-side logic for managing landings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var marked = require('marked');

module.exports = {



  home: function(req, res) {

    /**
     * Sort an array of objects based on a specified property
     * @param property :: the property to sort the array of objects by
     */
    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }

    Page.findOne({
      pid: 'phoenix-suns-radio'
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 00002");
        res.serverError();
      } else {
        // Do the async shit
        var broadcasts = [];
        Broadcast.find({}).exec(function findCB(err, found) {
          while (found.length) {
            broadcasts.push(found.pop());
          }
          broadcasts.sort(dynamicSort("date"));
          broadcasts.reverse();
          currentPage.introText = marked(currentPage.introText);
          res.view('landing/home', {
            page: currentPage,
            broadcasts: broadcasts,
            currentPage: 'home',
          });
        });
      }
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
          about: '',
          marked: '',
        });
      } else {
        var text = marked(currentPage.about);
        res.view('landing/about', {
          currentPage: 'about',
          about: currentPage.about,
          marked: text,
        });
      }
    });
  },

  testAdmin: function(req, res) {
    res.view('admin/dash');
  }

};