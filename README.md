# login.dfe.config.schema
Schemas and validation for DfE login config

## Using the package
After adding an npm reference to the package, you require the schema you need and call validate with the config loaded in the application

```javascript
const { directoriesSchema } = require('login.dfe.config.schema');
const validationResult = directoriesSchema.validate(config);
if (!validationResult.isValid) {
  validationResult.forEach((item) => {
    console.log(JSON.stringify(item));
  });
}
```

Available schema are:

* directoriesSchema
* hotConfigSchema
* interactionsSchema
* jobsSchema
* migrationSchema
* migrationAdminSchema
* oidcSchema
* organisationsSchema
* portalSchema