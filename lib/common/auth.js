const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['jwt', 'aad']
  },
  identityMetadata: {
    type: String,
    custom: function () {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  clientID: {
    type: String,
    custom: function () {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
});

module.exports = schema;