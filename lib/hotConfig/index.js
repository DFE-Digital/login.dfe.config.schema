const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');
const patterns = require('./../common/patterns');
const apiAuth = require('./../common/apiAuth');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,
  auth: auth,

  storage: Object,
  'storage.type': {
    type: String,
    allowedValues: ['redis', 'azureblob'],
  },
  'storage.params': Object,
  'storage.params.url': {
    type: String,
    regEx: patterns.REDISPATTERN,
    optional: true,
    custom: function () {
      if (this.field('storage.type').value === 'redis' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'storage.params.oidcUrl': {
    type: String,
    regEx: /https:\/\/.*/,
    optional: true,
    custom: function () {
      if (this.field('storage.type').value === 'azureblob' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'storage.params.samlUrl': {
    type: String,
    regEx: /https:\/\/.*/,
    optional: true,
    custom: function () {
      if (this.field('storage.type').value === 'azureblob' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
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
