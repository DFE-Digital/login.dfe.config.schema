const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({
  useDevViews: {
    type: Boolean,
    optional: true,
  },
  env: String,
  host: String,
  port: {
    type: SimpleSchema.Integer,
  },
  protocol: {
    type: String,
    allowedValues: ['http', 'https'],
  },
  sslCert: {
    type: String,
    optional: true,
  },
  sslKey: {
    type: String,
    optional: true,
  },
  sessionSecret: {
    type: String,
    optional: true,
  },
  applicationInsights : {
    type: String,
    optional: true,
  },
  sessionCookieExpiryInMinutes: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  gaTrackingId: {
    type: String, 
    optional: true,
  },
});

module.exports = schema;