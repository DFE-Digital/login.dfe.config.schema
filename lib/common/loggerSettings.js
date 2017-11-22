const SimpleSchema = require('simpl-schema').default;
const loggerColors = ['yellow', 'green', 'red', 'magenta'];

const schema = new SimpleSchema({
  levels: {
    type: Object,
    optional: true,
  },
  'levels.info': {
    type: SimpleSchema.Integer,
    optional: true,
  },
  'levels.ok': {
    type: SimpleSchema.Integer,
    optional: true,
  },
  'levels.error': {
    type: SimpleSchema.Integer,
    optional: true,
  },
  'levels.audit': {
    type: SimpleSchema.Integer,
    optional: true,
  },

  logLevel: {
    type: String,
    allowedValues: ['debug', 'info', 'warn', 'error'],
    optional: true,
  },

  colors: Object,
  'colors.info': {
    type: String,
    optional: true,
    allowedValues: loggerColors
  },
  'colors.ok': {
    type: String,
    optional: true,
    allowedValues: loggerColors
  },
  'colors.error': {
    type: String,
    optional: true,
    allowedValues: loggerColors
  },
  'colors.audit': {
    type: String,
    optional: true,
    allowedValues: loggerColors
  },

  redis: {
    type: Object,
    optional: true,
  },
  'redis.enabled': Boolean,
  'redis.host': String,
  'redis.port': SimpleSchema.Integer,
  'redis.auth': String,
});

module.exports = schema;