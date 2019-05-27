/**
 * Contacts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    phone: {
      type: 'string',
      required: true
    },
    photoname : {
      type : 'string',
      required: true
    },
    photouid : {
      type: 'string',
      required: true
    },
  },

  // datastore: 'mysql'

};
