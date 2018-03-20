const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({

  maxSockets: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  maxFreeSockets: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  timeout: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  keepAliveTimeout: {
    type: SimpleSchema.Integer,
    optional: true,
  },
});

module.exports = schema;