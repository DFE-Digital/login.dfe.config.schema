const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');

const schema = new SimpleSchema.default({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  queueStorage: Object,
  'queueStorage.connectionString': /redis:\/\/.*/,

  migrationAdmin: Object,
  'migrationAdmin.directories': apiAuth,
  'migrationAdmin.organisations': apiAuth,
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
