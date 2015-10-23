/**
 * Broadcast.js
 *
 * @description :: Model for the broadcast... Holds information about broadcasts.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    bid: {
      type: 'string',
      unique: true
    },

    title: {
      type: 'string',
      required: true
    },

    embedCode: {
      type: 'string',
    },

    date: {
      type: 'string',
    },

    summary: {
      type: 'string'
    },


  }
};