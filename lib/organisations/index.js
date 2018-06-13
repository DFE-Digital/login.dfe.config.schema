const SimpleSchema = require('simpl-schema').default;
const hostingEnvironment = require('./../common/hostingEnvironment');
const loggerSettings = require('./../common/loggerSettings');
const auth = require('./../common/auth');
const sequelizeConnectionParams = require('./organisationsSequelizeParams');

const schema = new SimpleSchema({
  hostingEnvironment: hostingEnvironment,
  loggerSettings: loggerSettings,

  auth: auth,

  database: sequelizeConnectionParams,

  gias: Object,
  'gias.type': {
    type: String,
    allowedValues: ['static', 'azureblob', 'gias'],
  },
  'gias.params': {
    type: Object,
    optional: true,
    custom: function () {
      if (this.siblingField('type').value !== 'static' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'gias.params.containerUrl': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('gias.type').value === 'azureblob' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'gias.params.webserviceUrl': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('gias.type').value === 'gias' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'gias.params.username': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('gias.type').value === 'gias' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'gias.params.password': {
    type: String,
    optional: true,
    custom: function () {
      if (this.field('gias.type').value === 'gias' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
  'gias.params.establishmentExtractId': {
    type: SimpleSchema.Integer,
    optional: true,
    custom: function () {
      if (this.field('gias.type').value === 'gias' && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },

  schedules: Object,
  'schedules.establishmentImport': String,
  'schedules.groupImport': String,
});

const validate = (config) => {
  const context = schema.newContext();
  context.validate(config);
  return {
    isValid: context.isValid(),
    errors: context.validationErrors(),
  };
};

module.exports = {
  validate,
};
