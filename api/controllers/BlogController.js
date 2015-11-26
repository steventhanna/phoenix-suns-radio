/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');

module.exports = {

  new: function(req, res) {
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
          pid: "phoenix-suns-radio"
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the overall page.");
            console.log("Error = " + err);
            console.log("Error Code: 00002");
            res.serverError();
          } else {
            // Create the blog object
            var display = "";
            var slice = false;
            if (post.contents.length > 500) {
              display = post.contents.substring(0, 500);
              slice = true;
            } else {
              display = post.contents;
            }
            var blogObj = {
              title: post.title,
              author: user.displayName,
              contents: post.contents,
              slice: slice,
              preview: display,
              blid: Math.floor(Math.random() * 1000000000000000000000),
              lastUpdated: moment().format("MM-DD-YYYY"),
            };
            console.log(blogObj);

            Blog.create(blogObj).exec(function(err, newBlogPost) {
              if (err || newBlogPost == undefined) {
                console.log("There was an error creating a new blog post.");
                console.log("Error = " + err);
                console.log("Error Code: 00015");
                res.send({
                  success: false,
                  error: true
                });
              } else {
                // Successful creation of blogpost
                // Add BLID to Page
                if (currentPage.blogs == null || currentPage.blogs == undefined) {
                  currentPage.blogs = [];
                }
                currentPage.blogs.push(blogObj.blid);
                console.log("This should work now.");
                res.send({
                  success: true,
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

    function updated(toCheck) {
      if (toCheck == undefined || toCheck === "" || toCheck === " ") {
        return false;
      } else {
        return true;
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
        Blog.findOne({
          blid: post.blid
        }).exec(function(err, currentBlog) {
          if (err || currentBlog == undefined) {
            console.log("There was an error looking up the blog post.");
            console.log("Error = " + err);
            console.log("Error Code: 0016");
            res.serverError();
          } else {
            var updated = false;
            if (updated(post.title) == true) {
              currentBlog.title = post.title;
              updated = true;
            }
            if (updated(post.contents) == true) {
              currentBlog.contents = post.contents;
              updated = true;
            }

            if (changes == true) {
              // Update the date
              currentBlog.date = post.currentDate;
              currentBlog.save(function(err) {
                if (err) {
                  console.log("There was an error saving the blog post.");
                  console.log("Error = " + err);
                  console.log("Error Code: 0017");
                  res.send({
                    success: false,
                    error: true
                  });
                } else {
                  res.send({
                    success: true,
                  });
                }
              });
            }
          }
        });
      }
    });
  },

  delete: function(req, res) {
    var post = req.body;
    Page.findOne({
      pid: "phoenix-suns-radio"
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 00002");
        res.serverError();
      } else {
        // Destroy the blog
        Blog.destroy({
          blid: post.blid
        }).exec(function(err) {
          if (err) {
            console.log("There was an error deleteing the blog.");
            console.log("Error = " + err);
            console.log("Error Code: 0018.");
            res.send({
              success: false,
              error: true
            });
          } else {
            // Remove the blid from the page array
            var id = post.blid;
            var index = currentPage.blogs.indexOf(id);
            if (index > -1) {
              currentPage.blogs.splice(index, 1);
            }
            currentPage.save(function(err) {
              if (err) {
                console.log("There was an error updating the current page after destorying the blog.");
                console.log("Error = " + err);
                console.log("Error Code: 0019");
                res.send({
                  success: false,
                  error: true
                });
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
  },

  settings: function(req, res) {
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
          pid: "phoenix-suns-radio"
        }).exec(function(err, currentPage) {
          if (err || currentPage == undefined) {
            console.log("There was an error looking up the page.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            var blogs = [];
            Blog.find({}).exec(function findBlog(err, found) {
              while (found.length) {
                blogs.push(found.pop());
              }
              res.view('admin/allBlogs', {
                user: user,
                currentPage: 'allBlogs',
                blogs: blogs,
                page: currentPage,
                currentSidebar: "allBlogs",
              });
            });
          }
        });
      }
    });
  },

  displayBlog: function(req, res) {
    var post = req.body;
    var url = req.url;

    // Get the url
    var array = url.split("/");
    var blid = array[array.length];

    Blog.findOne({
      blid: blid
    }).exec(function(err, currentBlog) {
      if (err || currentBlog == undefined) {
        console.log("There was an error looking up the current blog.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        res.view('landing/currentBlog', {
          currentBlog: currentBlog
        });
      }
    });
  },

  newBlogPage: function(req, res) {
    User.findOne({
      id: req.user.id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error looking up the logged in user.");
        console.log("Error = " + err);
        console.log("Error Code: 00001");
        res.serverError();
      } else {
        res.view('admin/addBlog', {
          user: user,
          currentPage: 'blog',
          currentSidebar: 'addBlog'
        });
      }
    });
  },
};