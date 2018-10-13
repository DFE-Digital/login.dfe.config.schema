const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');
const auth = require('./../common/auth');
const oidcHostingEnvironment = require('./oidcHostingEnvironment');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  requestVerification: Object,
  'requestVerification.isEnabled': Boolean,
  'requestVerification.cert': String,

  api: Object,
  'api.auth': auth,

  accounts: apiAuth,


  applications: Object,
  'applications.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'applications.service': {
    type: apiAuth,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value === 'api' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  clientManagement: Object,
  'clientManagement.enabled': Boolean,
  'clientManagement.connectionString': /^redis:\/\/.*$/,
  'clientManagement.sessionKey': String,

  oidc: Object,
  'oidc.secureKey': String,
  'oidc.longCookieTimeOutInMinutes': SimpleSchema.Integer,
  'oidc.shortCookieTimeOutInMinutes': SimpleSchema.Integer,
  'oidc.interactionBaseUrl': /^https:\/\/.*$/,
  'oidc.redisConnectionString': /^redis:\/\/.*$/,
  'oidc.keyStore': Object,
  'oidc.keyStore.keys': Array,
  'oidc.keyStore.keys.$': {
    type: Object,
    blackbox: true,
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
