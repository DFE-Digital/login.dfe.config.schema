const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');
const apiAuth = require('./../common/apiAuth');
const patterns = require('./../common/patterns');

const schema = new SimpleSchema({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  userCodes: Object,
  'userCodes.type': {
    type: String,
    allowedValues: ['static', 'redis', 'sequelize'],
  },
  'userCodes.params': {
    type: Object,
    custom: function () {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
    blackbox: true
  },

  adapter: Object,
  'adapter.type': {
    type: String,
    allowedValues: ['file', 'redis', 'mongo', 'azuread', 'sequelize'],
  },
  'adapter.params': {
    type: Object,
    custom: function () {
      if (this.siblingField('type').value !== 'file' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
    blackbox: true
  },

  auth: auth,

  notifications: Object,
  'notifications.connectionString': patterns.REDISPATTERN,

  invitations: Object,
  'invitations.type': {
    type: String,
    allowedValues: ['sequelize', 'redis']
  },
  'invitations.redisUrl': {
    type: String,
    optional: true,
    regEx: patterns.REDISPATTERN,
    custom: function () {
      if (this.siblingField('type').value === 'redis' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'invitations.params': {
    type: Object,
    custom: function () {
      if (this.siblingField('type').value === 'sequelize' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
    blackbox: true
  },

  devices: Object,
  'devices.type': {
    type: String,
    allowedValues: ['static', 'redis', 'azureblob', 'sequelize']
  },
  'devices.redisUrl': {
    type: String,
    optional: true,
    regEx: patterns.REDISPATTERN,
    custom: function () {
      if (this.siblingField('type').value === 'redis' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'devices.containerUrl': {
    type: String,
    optional: true,
    regEx: /https:\/\/.*/,
    custom: function () {
      if (this.siblingField('type').value === 'azureblob' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'devices.params': {
    type: Object,
    custom: function () {
      if (this.siblingField('type').value === 'sequelize' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
    blackbox: true
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
