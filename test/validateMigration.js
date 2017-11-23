const validator = require('./../lib/migration');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'migration.json');