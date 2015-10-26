/**
 * Blog.js
 * @author      :: Steven Hanna http://github.com/steventhanna
 * @description :: Model for blog posts
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    blid: {
      type: 'string',
      unique: true
    },

    title: {
      type: 'string'
    },

    date: {
      type: 'string'
    },

    contents: {
      type: 'string'
    },

    author: {
      type: 'string'
    },
  }
};