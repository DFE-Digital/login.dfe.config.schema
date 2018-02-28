const SimpleSchema = require('simpl-schema').default;
const sequelizeConnectionParams = require('./../common/sequelizeConnectionParams');

const schema = new SimpleSchema({
  postgresUrl: {
    type: String,
    regEx: /^postgres:\/\/.*$/,
    optional: true,
    custom: function() {
      if (!this.siblingField('host').isSet && !this.isSet) {
        return SimpleSchema.ErrorTypes.REQUIRED
      }
    },
  },
});
schema.extend(sequelizeConnectionParams);

module.exports = schema;
