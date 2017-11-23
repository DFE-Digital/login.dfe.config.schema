const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  url: /^https:\/\/.*$/,
  clientId: String,
  clientSecret: String,
  clockTolerance: SimpleSchema.Integer,
});

module.exports = schema;