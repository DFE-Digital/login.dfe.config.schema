const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  logLevel: {
    type: String,
    allowedValues: ['debug', 'info', 'warn', 'error'],
    optional: true,
  },
  auditDb: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  redis: {
    type: Object,
    optional: true,
  },
  applicationName: {
    type: String,
    optional: true,
  },
  'redis.enabled': Boolean,
  'redis.host': String,
  'redis.port': SimpleSchema.Integer,
  'redis.auth': String,
});

module.exports = schema;