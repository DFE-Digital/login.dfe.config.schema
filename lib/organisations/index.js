const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');

const schema = new SimpleSchema.default({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  auth: auth,

  database: Object,
  'database.postgresUrl': {
    type: String,
    regEx: /^postgres:\/\/.*$/,
    optional: true,
    custom: function() {
      if (!this.siblingField('host').isSet && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'database.host': {
    type: String,
    optional: true,
    custom: function() {
      if (!this.siblingField('postgresUrl').isSet && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'database.username': {
    type: String,
    optional: true,
    custom: function() {
      if (!this.siblingField('postgresUrl').isSet && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'database.password': {
    type: String,
    optional: true,
    custom: function() {
      if (!this.siblingField('postgresUrl').isSet && !this.isSet) {
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
