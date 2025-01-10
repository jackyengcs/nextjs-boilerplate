const path = require('node:path');

module.exports = {
  '*': (filenames) => {
    // Filter out `tailwind.config.ts`
    const filteredFiles = filenames.filter(
      file => !['tailwind.config.ts', 'tsconfig.json'].includes(path.basename(file)),
    );
    return [`eslint --fix --no-warn-ignored ${filteredFiles.join(' ')}`];
  },
  '**/*.ts?(x)': () => 'npm run check-types',
};
