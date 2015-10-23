/**
 * BroadcastController
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Server-side logic for managing broadcasts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // TODO :: Sort the broadcast array before sending to page.
  new: function(req, res) {
    var post = req.body;

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

    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        Page.findOne({
          pid: post.pid
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            var title = post.title;
            var embedCode = post.embedCode;
            var date = post.date;
            var summary = post.summary;
            // Generate custom bid
            var bid = Math.floor(Math.random() * 1000000000000000000000);
            var broadcastData = {
              title: title,
              embedCode: embedCode,
              date: date,
              summary: summary,
              bid: bid
            };

            // Create broadcast
            Broadcast.create(broadcastData).exec(function(err, newBroadcast) {
              if (err || newBroadcast == undefined) {
                console.log("There was an error creating the new broadcast.");
                console.log("Error = " + err);
                console.log("Error Code: 00004");
                res.send({
                  success: false,
                  error: true
                });
              } else {
                if (currentPage.broadcasts == null || currentPage.broadcasts == undefined) {
                  currentPage.broadcasts = [];
                }
                currentPage.broadcasts.push(bid);
                // Save the current page
                currentPage.save(function(err) {
                  if (err) {
                    console.log("There was an error saving the page after adding broadcast bid.");
                    console.log("Error = " + err);
                    console.log("Error Code: 00005");
                    res.send({
                      success: false,
                      error: true
                    });
                  } else {
                    res.send({
                      success: true
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  delete: function(req, res) {
    var post = req.body;

    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        Page.findOne({
          pid: post.pid
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            // Destory the broadcast
            Broadcast.destroy({
              bid: post.bid
            }).exec(function(err) {
              if (err) {
                console.log("There was an error tyring to destroy the broadcast.");
                console.log("Error = " + err);
                console.log("Error Code: 00006");
                res.send({
                  success: false,
                  error: true
                });
              } else {
                // Remove bid from page
                // Find location of broadcast in pageArray
                var id = post.bid;
                var index = currentPage.broadcasts.indexOf(id);
                if (index > -1) {
                  currentPage.broadcasts.splice(index, 1);
                }
                currentPage.save(function(err) {
                  if (err) {
                    console.log("There was an error updating the current page after destorying the broadcast.");
                    console.log("Error = " + err);
                    console.log("Error Code: 00007");
                  } else {
                    res.send({
                      success: true,
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  edit: function(req, res) {
    var post = req.body;

    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
      } else {
        Broadcast.findOne({
          bid: post.bid
        }).exec(function(err, currentBroadcast) {
          if (err || currentBroadcast == undefined) {
            console.log("There was an error looking up the broadcast.");
            console.log("Error = " + err);
            console.log("Error Code: 00008");
          } else {
            var changes = false;
            if (post.title != undefined) {
              currentBroadcast.title = post.title;
              changes = true;
            }
            if (post.date != undefined) {
              currentBroadcast.date = post.date;
              changes = true;
            }
            if (post.embedCode != undefined) {
              currentBroadcast.embedCode = post.embedCode;
              changes = true;
            }
            if (post.summary != undefined) {
              currentBroadcast.summary = post.summary;
              changes = true;
            }

            if (changes == true) {
              currentBroadcast.save(function(err) {
                if (err) {
                  console.log("There was an error saving the broadcast after updates have been made.");
                  console.log("Error = " + err);
                  console.log("Error Code: 00009");
                  res.send({
                    success: false,
                    error: true
                  });
                } else {
                  res.send({
                    success: true
                  });
                }
              });
            }
          }
        });
      }
    });
  },



};