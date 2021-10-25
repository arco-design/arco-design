const fs = require('fs-extra');
const path = require('path');
const { version } = require('../package.json');

const text = fs.readFileSync(path.resolve(__dirname, '../site/public/index.html'), 'utf-8');

const textReplacedVersion = text
  .split('\n')
  .map((t) => {
    if (/const VERSION = /.test(t)) {
      return `      const VERSION = '${version}'`;
    }
    return t;
  })
  .join('\n');

fs.outputFile(path.resolve(__dirname, '../site/public/index.html'), textReplacedVersion).then(
  () => {
    console.log('替换 html 模版中的 version 成功！'); // eslint-disable-line
  }
);
