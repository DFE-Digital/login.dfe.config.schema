const validator = require('./../lib/directories');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'directories.json');