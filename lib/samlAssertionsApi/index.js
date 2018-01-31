const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');
const apiAuth = require('./../common/apiAuth');

const schema = new SimpleSchema.default({
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

  auth: auth,

  assertions: Object,
  'assertions.type': {
    type: String,
    allowedValues: ['static', 'redis']
  },
  'assertions.redisUrl': {
    type: String,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value === 'redis' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  }
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
