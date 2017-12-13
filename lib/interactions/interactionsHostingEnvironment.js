const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');

const schema = new SimpleSchema({
  portalUrl: /^http(s{0,1}):\/\/.*$/,

  rateLimit: Object,
  'rateLimit.host': String,
  'rateLimit.port': SimpleSchema.Integer,
  'rateLimit.password': {
    type: String,
    optional: true,
  },
});
schema.extend(hostingEnvironment);

module.exports = schema;
