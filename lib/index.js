const directoriesSchema = require('./directories');
const hotConfigSchema = require('./hotConfig');
const interactionsSchema = require('./interactions');
const jobsSchema = require('./jobs');
const migrationSchema = require('./migration');
const migrationAdminSchema = require('./migrationAdmin');
const oidcSchema = require('./oidc');
const organisationsSchema = require('./organisations');
const portalSchema = require('./portal');
const profileSchema = require('./profile');
const servicesSchema = require('./services');
const samlAssertionsApi = require('./samlAssertionsApi');

const validateConfig = (schema, config, logger, strict) => {
  const validationResult = schema.validate(config);
  if (!validationResult.isValid) {
    const logMethod = strict ? logger.error : logger.warn;
    logMethod('Config is invalid!');
    validationResult.errors.forEach((item) => {
      logMethod(JSON.stringify(item));
    });

    if (strict) {
      process.exit(1);
    }
    return false;
  }
  return true;
};

const validateConfigAndQuitOnError = (schema, config, logger) => {
  validateConfig(schema, config, logger, true);
};

module.exports = {
  directoriesSchema,
  hotConfigSchema,
  interactionsSchema,
  jobsSchema,
  migrationSchema,
  migrationAdminSchema,
  oidcSchema,
  organisationsSchema,
  portalSchema,
  profileSchema,
  servicesSchema,
  samlAssertionsApi,

  validateConfigAndQuitOnError,
};
