const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');
const oidcIdp = require('./../common/oidcIdp');

const schema = new SimpleSchema.default({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  directories: Object,
  'directories.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'directories.directoryId': String,
  'directories.service': apiAuth,

  identifyingParty: oidcIdp,

  organisations: Object,
  'organisations.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'organisations.service': apiAuth,
});

const validate = (config) => {
  const context = schema.newContext();
  context.validate(config);
  return {
    isValid: context.isValid(),
    errors: context.validationErrors(),
  };
};

module.exports = {
  validate,
};
