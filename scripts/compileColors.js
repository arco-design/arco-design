const fs = require('fs');
const path = require('path');
const less = require('less');

const FILENAME_SOURCE = 'colors.less';
const FILENAME_TARGET = 'compiled-colors.less';
const DIR = path.resolve(process.cwd(), './components/style/theme/color');

const compileColors = async () => {
  const lessOption = {
    filename: `${DIR}/temp.less`,
  };

  return less
    .parse(fs.readFileSync(`${DIR}/${FILENAME_SOURCE}`).toString(), lessOption)
    .then((output) => {
      // 提取所有的 less 变量，将其构建为 key 和 value 都为变量名的 less 并编译
      const variables = Object.keys(output.variables());
      return less.render(
        `
          @import './colors.less';
          #vars {
            ${variables.map((v) => `${v.replace('@', '')}: ${v}`).join(';\n')}
          }
          `,
        lessOption
      );
    })
    .then((output) => {
      fs.writeFileSync(
        `${DIR}/${FILENAME_TARGET}`,
        output.css
          .replace(/#vars {([\s\S]*)}/, (str, $1) => {
            return `\n${$1.replace(/.*\n/g, (str) => {
              str = str.trim();
              return (str && `@${str}\n`) || '';
            })}`;
          })
          .replace(/\s,/g, ',')
      );
    })
    .catch((error) => {
      console.error(error);
      process.exit();
    });
};

compileColors();

module.exports = {
  compileColors,
  FILENAME_SOURCE,
  FILENAME_TARGET,
};
