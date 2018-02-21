const getStartupArguments = () => {
  const args = {
    recursive: false,
    showHelp: false,
    path: './',
  };

  for (let i = 2; i < process.argv.length; i += 1) {
    const a = process.argv[i];
    if (a === '--recursive') {
      args.recursive = true;
    } else if (a === '--help') {
      args.showHelp = true;
    } else if (a.length > 1 && a[0] === '-' && a[1] !== '-') {
      for (let j = 1; j < a.length; j += 1) {
        switch (a[j]) {
          case 'r':
            args.recursive = true;
            break;
          case 'h':
            args.showHelp = true;
            break;
        }
      }
    }
  }

  const lastArg = process.argv[process.argv.length - 1];
  if (process.argv.length > 2 && !lastArg.startsWith('-')) {
    args.path = lastArg;
  }

  return args;
};

const showHelp = () => {
  console.log('Usage: ');
  console.log('  node checkConfig.js [options] path');
  console.log(' ');
  console.log('Description');
  console.log('   This will use a convention based system to check file(s) against the relevant schema');
  console.log('   ');
  console.log('  path can either be a single config file, or a directory containing multiple config files');
  console.log('   ');
  console.log('Options');
  console.log('  -r, --recursive   recursively check sub folders when path is a directory');
  console.log('  -h, --help        show help');
};

module.exports = {
  getStartupArguments,
  showHelp,
};
