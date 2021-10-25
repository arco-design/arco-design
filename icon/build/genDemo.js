const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const { svgData } = require('./getSvgData');
const newIcons = require('./new');
const maps = require('./maps');

for (const key in svgData) {
  ['outline', 'fill', 'color'].forEach((type) => {
    if (svgData[key][type]) {
      svgData[key][type].forEach((svg) => {
        delete svg.file;
      });
    }
  });
}

const demoCode = nunjucks.render('./demo.nunjucks.jsx', {
  svgData: JSON.stringify(svgData),
  newIcons: JSON.stringify(newIcons),
  maps: JSON.stringify(maps),
});

fs.outputFileSync('../demo.js', demoCode);

console.log('\nGenerate Icon Demo Success!\n'); // eslint-disable-line
