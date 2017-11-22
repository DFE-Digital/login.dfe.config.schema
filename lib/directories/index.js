const SimpleSchema = require('simpl-schema');

const schema = new SimpleSchema.default({
  hostingEnvironment: Object,
  'hostingEnvironment.useDevViews': Boolean,
  'hostingEnvironment.env': String,
  'hostingEnvironment.host': String,
  'hostingEnvironment.port': {
    type: String,
  },
  'hostingEnvironment.protocol': {
    type: String,
    allowedValues: ['http', 'https'],
  },
  'hostingEnvironment.sslCert': {
    type: String,
    optional: true,
  },
  'hostingEnvironment.sslKey': {
    type: String,
    optional: true,
  },

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

  auth: Object,
  'auth.type': {
    type: String,
    allowedValues: ['jwt', 'aad']
  },
  'auth.identityMetadata': {
    type: String,
    custom: function () {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'auth.clientID': {
    type: String,
    custom: function () {
      if (this.siblingField('type').value !== 'jwt' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  notifications: Object,
  'notifications.connectionString': /redis:\/\/.*/,

  invitations: Object,
  'invitations.redisUrl': /redis:\/\/.*/,
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
