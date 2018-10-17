const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');

const schema = new SimpleSchema({
  portalUrl: /^http(s{0,1}):\/\/.*$/,
  ktsUrl: /^http(s{0,1}):\/\/.*$/,
});
schema.extend(hostingEnvironment);

module.exports = schema;
