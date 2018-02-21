const { getStartupArguments, showHelp } = require('./startup');
const { listFiles } = require('./fileSystem');
const { validateFile } = require('./schema');

const writeResultToConsole = (fileDetails) => {
  if (!fileDetails.validationResult) {
    return;
  }

  console.log(' ');
  console.log('----------------------------------------------------------------');
  console.log('\x1b[30m\x1b[1m', `${fileDetails.relativePath}`);
  if (fileDetails.validationResult.isValid) {
    console.log('\x1b[32m', 'Config is valid', '\x1b[39m');
  } else {
    for (let i = 0; i < fileDetails.validationResult.errors.length; i += 1) {
      console.log('\x1b[31m', `   ${JSON.stringify(fileDetails.validationResult.errors[i])}`, '\x1b[39m');
    }
  }
};

const run = async () => {
  const startupArgs = getStartupArguments();

  if (startupArgs.showHelp) {
    return showHelp();
  }

  const candidateFiles = await listFiles(startupArgs.path, startupArgs.recursive);
  if (!candidateFiles || candidateFiles.length === 0) {
    return;
  }
  const validatedFiles = await Promise.all(candidateFiles.map(async (fileDetails) => {
    const validationResult = await validateFile(fileDetails.fullPath);
    return Object.assign({ validationResult }, fileDetails);
  }));

  let allFilesValid = true;
  for (let i = 0; i < validatedFiles.length; i += 1) {
    if (validatedFiles[i].validationResult && !validatedFiles[i].validationResult.isValid) {
      allFilesValid = false;
    }

    writeResultToConsole(validatedFiles[i]);
  }

  return allFilesValid;
};

run()
  .catch((e) => {
    console.error(e);
  })
  .then((allFilesValid) => {
    if (!allFilesValid) {
      process.exit(1);
    }
  });