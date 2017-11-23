const validator = require('./../lib/migrationAdmin');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'migration-admin.json');