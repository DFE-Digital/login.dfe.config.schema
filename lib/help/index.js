const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const apiAuth = require('./../common/apiAuth');
const patterns = require('./../common/patterns');

const schema = new SimpleSchema({
  loggerSettings: loggerSettings,
  hostingEnvironment: hostingEnvironment,

  notifications: Object,
  'notifications.connectionString': patterns.REDISPATTERN,
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
