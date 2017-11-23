const validator = require('./../lib/jobs');
const { validateConfig } = require('./doValidationHelper');

validateConfig(validator, 'jobs.json');