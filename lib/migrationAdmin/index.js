const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const oidcIdp = require('./../common/oidcIdp');

const schema = new SimpleSchema.default({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,
  identifyingParty: oidcIdp,

  oldSecureAccess: Object,
  'oldSecureAccess.type': {
    type: String,
    allowedValues: ['static', 'legacy'],
  },
  'oldSecureAccess.params': {
    type: Object,
    custom: function() {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    }
  },
  'oldSecureAccess.params.legacyConnectionString': /^postgres:\/\/.*$/,
  'oldSecureAccess.params.decryptionKey': String,

  jobs: Object,
  'jobs.connectionString': /^redis:\/\/.*$/
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
