const { getFileName, readJsonFromFile } = require('./fileSystem');
const {
  directoriesSchema,
  hotConfigSchema,
  interactionsSchema,
  jobsSchema,
  migrationSchema,
  migrationAdminSchema,
  oidcSchema,
  organisationsSchema,
  profileSchema,
  servicesSchema,
  samlAssertionsApi,
} = require('./../lib');

const matchFileNameToSchema = (fullPath) => {
  const fileName = getFileName(fullPath);
  if (fileName.toLowerCase().startsWith('login.dfe.devices')) {
    return null; //TODO
  }
  if (fileName.toLowerCase().startsWith('login.dfe.directories')) {
    return directoriesSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.hot-config')) {
    return hotConfigSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.interactions')) {
    return interactionsSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.jobs')) {
    return jobsSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.migration.admin') || fileName.toLowerCase().startsWith('login.dfe.migrations.admin')) {
    return migrationAdminSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.migration')) {
    return migrationSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.oidc')) {
    return oidcSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.organisations')) {
    return organisationsSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.profile')) {
    return profileSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.saml-assertions')) {
    return samlAssertionsApi;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.services')) {
    return servicesSchema;
  }
  if (fileName.toLowerCase().startsWith('login.dfe.support')) {
    return null; //TODO
  }
  return null;
};

const validateFile = async (fullPath) => {
  let validator = matchFileNameToSchema(fullPath);
  if (validator === null) {
    return null;
  }

  const config = await readJsonFromFile(fullPath);
  return validator.validate(config);
};

module.exports = {
  validateFile,
};
