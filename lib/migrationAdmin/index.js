const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const oidcIdp = require('./../common/oidcIdp');
const sequelizeConnectionParams = require('./../common/sequelizeConnectionParams');

const schema = new SimpleSchema({
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
    optional: true,
    custom: function() {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    }
  },
  'oldSecureAccess.params.legacyConnectionString': /^postgres:\/\/.*$/,
  'oldSecureAccess.params.decryptionKey': String,

  eas: Object,
  'eas.type':{
    type: String,
    allowedValues: ['static', 'sequelize'],
  },
  'eas.params': {
    type: sequelizeConnectionParams,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'eas.ktsServiceId': String,
  'eas.laOrganisationId': String,

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
