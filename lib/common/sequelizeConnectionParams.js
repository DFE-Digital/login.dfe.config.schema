const SimpleSchema = require('simpl-schema').default;

const schema = new SimpleSchema({


  connectionString: {
    type: String,
    optional: true
  },
  host: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  password: {
    type: String,
    optional: true
  },
  dialect: {
    type: String,
    optional: true,
    allowedValues: ['postgres', 'mssql'],
  },
  name: {
    type: String,
    optional: true
  },
  encrypt: {
    type: Boolean,
    optional: true
  },
  schema: {
    type: String,
    optional: true
  },
});

module.exports = schema;
