/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    controller: 'landing',
    action: 'home'
  },

  'GET /about': {
    controller: 'landing',
    action: 'about'
  },

  'GET /social': {
    controller: 'landing',
    action: 'social'
  },

  'GET /admin': {
    controller: 'user',
    action: 'admin'
  },

  'POST /login': {
    controller: 'auth',
    action: 'login'
  },

  'GET /logout': {
    controller: 'auth',
    action: 'logout'
  },

  'GET /create-account': {
    controller: 'user',
    action: 'createAccount'
  },

  'POST /create-account': {
    controller: 'auth',
    action: 'createAccount'
  },

  'GET /dashboard': {
    controller: 'user',
    action: 'overview'
  },

  'POST /broadcast/new': {
    controller: 'broadcast',
    action: 'new'
  },

  'POST /broadcast/delete': {
    controller: 'broadcast',
    action: 'delete'
  },

  'POST /broadcast/edit': {
    controller: 'broadcast',
    action: 'edit'
  },

  'GET /broadcasts': {
    controller: 'user',
    action: 'broadcast'
  },

  'POST /page/new': {
    controller: 'page',
    action: 'new'
  },

  'POST /page/about': {
    controller: 'page',
    action: 'editAbout'
  },

  'GET /about-settings': {
    controller: 'user',
    action: 'aboutSettings'
  },

  // View a specific broadcast
  'GET /broadcast/:broadcastID': {
    controller: 'broadcast',
    action: 'view'
  },

  'GET /settings': {
    controller: 'user',
    action: 'settings'
  },

  'GET /blog': {
    controller: 'user',
    action: 'blog'
  },

  'POST /blog/new': {
    controller: 'blog',
    action: 'new'
  },

  'POST /blog/edit': {
    controller: 'blog',
    action: 'edit'
  },

  'POST /blog/remove': {
    controller: 'blog',
    action: 'delete'
  },

  'GET /blog/:blogID': {
    controller: 'blog',
    action: 'displayBlog'
  },

  'GET /blog-settings': {
    controller: 'blog',
    action: 'settings'
  },

  'GET /add-blog': {
    controller: 'blog',
    action: 'newBlogPage'
  },

  'GET /blog/edit/:blogID': {
    controller: 'blog',
    action: 'displayEdit'
  },



};
