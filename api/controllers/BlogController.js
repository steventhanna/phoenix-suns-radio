/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
            var blogObj = {
              title: post.tile,
              author: user.displayName,
              contents: post.contents,
              blid: Math.floor(Math.random() * 1000000000000000000000),
            };

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

  blogposts: function(req, res) {
    Page.findOne({
      pid: "phoenix-suns-radio"
    }).exec(function(err, currentPage) {
      if (err || currentPage == undefined) {
        console.log("There was an error looking up the overall page.");
        console.log("Error = " + err);
        console.log("Error Code: 00002");
        res.serverError();
      } else {
        // Get all of the blog posts
        var blogIds = currentPage.blogs;
        var blogposts = [];
        if (blogIds.length > blogposts.length) {
          for (var i = 0; i < blogIds.length; i++) {
            Blog.findOne({
              blid: blogIds[i]
            }).exec(function(err, currentBlog) {
              if (err || currentBlog == undefined) {
                console.log("There was an error looking up the blog post.");
                console.log("Error = " + err);
                console.log("Error Code: 0016");
                res.serverError();
              } else {
                blogposts.push(currentBlog);
              }
            });
          }
          if (blogposts.length == blogIds.length) {
            res.view('landing/blog', {
              page: currentPage,
              blogposts: blogposts,
              currentPage: 'blog'
            });
          }
        } else if (blogIds.length == blogposts.length) {
          if (blogposts.length == blogIds.length) {
            res.view('landing/blog', {
              page: currentPage,
              blogposts: blogposts,
              currentPage: 'blog'
            });
          }
        } else {
          if (blogposts.length == blogIds.length) {
            res.view('landing/blog', {
              page: currentPage,
              blogposts: undefined,
              currentPage: 'blog'
            });
          }
        }
      }
    });
  },

};