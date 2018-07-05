const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');
const patterns = require('./../common/patterns');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  queueStorage: Object,
  'queueStorage.connectionString': patterns.REDISPATTERN,

  migrationAdmin: Object,
  'migrationAdmin.directories': apiAuth,
  'migrationAdmin.organisations': apiAuth,

  notifications: Object,
  'notifications.supportEmailAddress': /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
  'notifications.interactionsUrl': /^http(s{0,1}):\/\/.*$/,
  'notifications.migrationUrl': /^http(s{0,1}):\/\/.*$/,
  'notifications.profileUrl': /^http(s{0,1}):\/\/.*$/,
  'notifications.servicesUrl': /^http(s{0,1}):\/\/.*$/,
  'notifications.email': Object,
  'notifications.email.type': {
    type: String,
    allowedValues: ['disk', 's3', 'ses']
  },
  'notifications.email.params': {
    type: Object,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value !== 'disk' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'notifications.email.params.accessKey': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('notifications.email.type').value !== 'disk' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'notifications.email.params.accessSecret': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('notifications.email.type').value !== 'disk' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'notifications.email.params.bucketName': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('notifications.email.type').value === 's3' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'notifications.email.params.region': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('notifications.email.type').value === 'ses' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'notifications.email.params.sender': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('notifications.email.type').value === 'ses' && !this.isSet) {
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
