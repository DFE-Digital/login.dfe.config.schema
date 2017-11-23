const directoriesSchema = require('./directories');
const hotConfigSchema = require('./hotConfig');
const interactionsSchema = require('./interactions');
const jobsSchema = require('./jobs');
const migrationSchema = require('./migration');
const migrationAdminSchema = require('./migrationAdmin');
const oidcSchema = require('./oidc');
const organisationsSchema = require('./organisations');
const portalSchema = require('./portal');

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
};
