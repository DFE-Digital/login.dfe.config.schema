const validator = require('./../lib/services');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'services.json');