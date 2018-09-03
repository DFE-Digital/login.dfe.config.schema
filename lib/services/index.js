const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./servicesHostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');
const oidcIdp = require('./../common/oidcIdp');

const schema = new SimpleSchema({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  directories: Object,
  'directories.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'directories.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  identifyingParty: oidcIdp,

  organisations: Object,
  'organisations.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'organisations.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  access: Object,
  'access.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'access.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  hotConfig: Object,
  'hotConfig.type': {
    type: String,
    allowedValues: ['static', 'api']
  },
  'hotConfig.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
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
