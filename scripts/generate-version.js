const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const entryFilePath = path.resolve(__dirname, '../components/index.tsx');
const entryFileContent = fs.readFileSync(entryFilePath, 'utf8');

fs.writeFileSync(
  entryFilePath,
  entryFileContent.replace(/export const version = '.*';/, `export const version = '${version}';`)
);
