const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./interactionsHostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  directories: Object,
  'directories.type': {
    type: String,
    allowedValues: ['static', 'directoriesapi'],
  },
  'directories.service': apiAuth,

  devices: Object,
  'devices.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'devices.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  osaApi: Object,
  'osaApi.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'osaApi.service': {
    type: apiAuth,
    optional: true,
    custom: function() {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  organisations: Object,
  'organisations.type': {
    type: String,
    allowedValues: ['static', 'api'],
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

  hotConfig: apiAuth,

  oidcService: Object,
  'oidcService.url': /^http(s{0,1}):\/\/.*$/,

  session: Object,
  'session.secret': String,

  userCodes: Object,
  'userCodes.type': {
    type: String,
    allowedValues: ['static', 'usercodesapi'],
  },

  crypto: Object,
  'crypto.signing': Object,
  'crypto.signing.publicKey': String,
  'crypto.signing.privateKey': String,
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
