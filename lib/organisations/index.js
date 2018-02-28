const SimpleSchema = require('simpl-schema');
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');
const sequelizeConnectionParams = require('./organisationsSequelizeParams');

const schema = new SimpleSchema.default({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  auth: auth,

  database: sequelizeConnectionParams,
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
