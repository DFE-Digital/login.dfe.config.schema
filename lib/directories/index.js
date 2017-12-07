const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const auth = require('./../common/auth');

const schema = new SimpleSchema({
  hostingEnvironment: hostingEnvironment,

  userCodes: Object,
  'userCodes.staticCode': Boolean,
  'userCodes.redisUrl': /redis:\/\/.*/,

  adapter: Object,
  'adapter.id': String,
  'adapter.type': {
    type: String,
    allowedValues: ['file', 'redis', 'mongo', 'azuread'],
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
  'notifications.connectionString': /redis:\/\/.*/,

  invitations: Object,
  'invitations.redisUrl': /redis:\/\/.*/,

  devices: Object,
  'devices.type': {
    type: String,
    allowedValues: ['static', 'redis']
  },
  'devices.redisUrl': {
    type: String,
    optional: true,
    regEx: /redis:\/\/.*/,
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
