const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');

const schema = new SimpleSchema({
  cookieKeys: Array,
});
schema.extend(hostingEnvironment);

module.exports = schema;
