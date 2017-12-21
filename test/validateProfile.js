const validator = require('./../lib/profile');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'profile.json');