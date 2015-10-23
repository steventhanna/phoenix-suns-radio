/**
 * Page.js
 *
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
      defualtsTo: '[]',
      required: true
    }
  }
};