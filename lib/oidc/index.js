const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');


const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  requestVerification: Object,
  'requestVerification.isEnabled': Boolean,
  'requestVerification.cert': String,

  accounts: apiAuth,

  clientManagement: Object,
  'clientManagement.enabled': Boolean,
  'clientManagement.connectionString': /^redis:\/\/.*$/,
  'clientManagement.sessionKey': String,

  hotConfig: apiAuth,

  oidc: Object,
  'oidc.secureKey': String,
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
