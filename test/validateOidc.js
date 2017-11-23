const validator = require('./../lib/oidc');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'oidc.json');