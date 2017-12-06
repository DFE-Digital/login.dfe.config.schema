const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./migrationHostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  directories: Object,
  'directories.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'directories.directoryId': String,
  'directories.service': apiAuth,

  organisations: Object,
  'organisations.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'organisations.service': apiAuth,

  devices: Object,
  'devices.type': {
    type: String,
    allowedValues: ['static', 'api'],
  },
  'devices.service': {
    type: apiAuth,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    }
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
