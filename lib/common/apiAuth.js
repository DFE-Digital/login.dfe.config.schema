const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  url: String,

  auth: Object,
  'auth.type': {
    type: String,
    allowedValues: ['secret', 'aad'],
  },
  'auth.jwt': {
    type: String,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.tenant': {
    type: String,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.authorityHostUrl': {
    type: String,
    regEx: /^http(s{0,1}):\/\/.*$/,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.clientId': {
    type: String,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.clientSecret': {
    type: String,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.resource': {
    type: String,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'secret' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
});

module.exports = schema;