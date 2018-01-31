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

const validateConfigAndQuitOnError = (schema, config, logger) => {
  const validationResult = schema.validate(config);
  if (!validationResult.isValid) {
    logger.error('Config is invalid!');
    validationResult.errors.forEach((item) => {
      logger.error(JSON.stringify(item));
    });
    return process.exit(1);
  }
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
