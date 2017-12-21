const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');

const schema = new SimpleSchema({
  profilesUrl: /^http(s{0,1}):\/\/.*$/,
});
schema.extend(hostingEnvironment);

module.exports = schema;
