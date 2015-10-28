/**
 * Page.js
 *
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Overall container for the website.  Holds all broadcast data.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    pid: {
      type: 'string',
      unique: true
    },

    broadcasts: {
      type: 'array',
      defaultsTo: '[]',
    },

    blogs: {
      type: 'array',
      defaultsTo: '[]',
    },

    // The content for the about section
    about: {
      type: 'string',
    }
  }
};