const fs = require('fs');
const path = require('path');
const { svgDataPure } = require('./getSvgData');
const maps = require('./maps');

const data = {};

data.icons = svgDataPure;
data.i18n = maps;

fs.writeFile(path.resolve(__dirname, '../icons.json'), JSON.stringify(data, null, 2), (err) => {
  if (err) return;
  // eslint-disable-next-line
  console.log('generate success!');
});
