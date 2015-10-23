/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
    var post = req.body;

    var pageData = {
      pid: Math.floor(Math.random() * 1000000000000000000000),
      broadcasts: []
    };

    Page.create(pageData).exec(function(err, newPage) {
      if (err || newPage == undefined) {
        console.log("There was an error creating the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 0010");
      } else {
        res.send({
          success: true,
        });
      }
    });
  }
};