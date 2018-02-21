const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const getPathDetails = async (inputPath) => {
  const fullPath = path.resolve(inputPath);
  try {
    const stats = await lstat(fullPath);
    return {
      fullPath,
      isDirectory: stats.isDirectory(),
    };
  } catch (e) {
    if (e.code === 'ENOENT' && e.errno === -2) {
      throw new Error(`Cannot find file or directory ${inputPath}`);
    }
    throw e;
  }
};

const getFileName = (fullPath) => {
  return path.basename(fullPath);
};

const listContentsOfDirectory = async (directoryPath, recursive) => {
  const contents = await readdir(directoryPath);

  const recursiveContent = await Promise.all(contents.map(async (subPath) => {
    const fullPath = path.join(directoryPath, subPath);
    if ((await lstat(fullPath)).isDirectory()) {
      return recursive ? await listContentsOfDirectory(fullPath) : null;
    } else {
      return fullPath;
    }
  }));

  const flatContent = [];
  for (let i = 0; i < recursiveContent.length; i++) {
    const item = recursiveContent[i];
    if (item === null) {
      // skip
    }
    else if (item instanceof Array) {
      for (var j = 0; j < item.length; j++) {
        flatContent.push(item[j]);
      }
    } else {
      flatContent.push(item);
    }
  }
  return flatContent;
};

const listFiles = async (configPath, recursive) => {
  const rootDetails = await getPathDetails(configPath);
  if (!rootDetails.isDirectory) {
    return [{
      relativePath: getFileName(rootDetails.fullPath),
      fullPath: rootDetails.fullPath,
    }];
  }

  const allContent = await listContentsOfDirectory(rootDetails.fullPath, recursive);
  return allContent.map((file) => {
    return {
      relativePath: file.substr(rootDetails.fullPath.length + 1),
      fullPath: file,
    };
  });
};

const readJsonFromFile = async (fullPath) => {
  const json = await readFile(fullPath, 'utf8');
  return JSON.parse(json);
};

module.exports = {
  listFiles,
  getFileName,
  readJsonFromFile,
};
