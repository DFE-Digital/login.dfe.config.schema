# login.dfe.config.schema
Schemas and validation for DfE login config

## Using the package
After adding an npm reference to the package, you require the schema you need and call validate with the config loaded in the application

```javascript
const { directoriesSchema } = require('login.dfe.config.schema');
' config is the javascript object that represents the config to be validated.
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

A helper method is also exported to provide a common pattern of validating, logginer and quitting on validation errors.

```javascript
const { validateConfigAndQuitOnError, directoriesSchema } = require('login.dfe.config.schema');
validateConfigAndQuitOnError(directoriesSchema, config, logger);
```

In the above, logger must have a function of `error(message)` on it, which will be used to log validation errors.