const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  url: String,

  auth: Object,
  'auth.type': {
    type: String,
    allowedValues: ['jwt', 'aad'],
  },
  'auth.tenant': {
    type: String,
    custom: function() {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.authorityHostUrl': {
    type: String,
    regEx: /^http(s{0,1}):\/\/.*$/,
    custom: function() {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.clientId': {
    type: String,
    custom: function() {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.clientSecret': {
    type: String,
    custom: function() {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.resource': {
    type: String,
    custom: function() {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
});

module.exports = schema;