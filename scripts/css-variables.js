const fs = require('fs');
const path = require('path');
const less = require('less');

const root = './components';
const absPath = `${root}/style/theme/color/colors.less`;

// const names = [
//   'red',
//   'orangered',
//   'orange',
//   'gold',
//   'yellow',
//   'lime',
//   'green',
//   'cyan',
//   'blue',
//   'arcoblue',
//   'purple',
//   'pinkpurple',
//   'magenta',
//   'gray',
// ];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}

async function genColorCSSVars() {
  return new Promise((resolve, reject) => {
    const str = fs.readFileSync(absPath).toString();

    const opts = {
      paths: `${root}`,
      filename: absPath,
    };

    less.parse(str, opts, (e, root, imports, d) => {
      if (e) {
        throw e;
      }
      const vars = root.variables();

      less
        .render(
          `
        @import "./colors.less";
        body {
          ${Object.keys(vars)
            .map((x) => `${x.replace('@', '')}: ${x}`)
            .join(';\n')}
        }`,
          opts
        )
        .then(({ css }) => {
          const cssStr = css
            .split('\n')
            .map((x) =>
              /-[0-9]/.test(x)
                ? `  --${x.trim().replace(/(#[0-9a-f]+)/, (match, p1) => {
                    return hexToRgb(p1);
                  })}`
                : x
            )
            .join('\n');
          const lessVarStr = Object.keys(vars)
            .map((v) => `${v}: rgb(var(${v.replace('@', '--')}));`)
            .join('\n');
          const finalStr = `${cssStr}\n${lessVarStr}`;
          fs.writeFileSync(
            path.resolve(__dirname, '../components/style/theme/color/colors_css_variables.less'),
            finalStr,
            'utf8'
          );
          // eslint-disable-next-line
          console.log(
            `File ${path.resolve(
              __dirname,
              '../components/style/theme/color/colors_css_variables.less'
            )} generate success`,
            '\n'
          );
          resolve();
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
          reject(err);
        });
    });
  });
}

// async function genGlobal() {
//   return new Promise((resolve) => {
//     const dir = path.resolve(__dirname, '../components/style/theme');
//     const file = path.resolve(dir, 'global.less');
//     let content = fs.readFileSync(file, 'utf8');
//     names.forEach((name) => {
//       const reg = new RegExp(`@(${name}-[0-9]+)`, 'g');
//       content = content.replace(reg, (match, p1) => `rgb(var(--${p1}))`);
//     });
//     fs.writeFileSync(path.resolve(dir, 'global_css_variables.less'), content, 'utf8');
//     // eslint-disable-next-line
//     console.log(`File ${path.resolve(dir, 'global_css_variables.less')} generate success`);
//     resolve();
//   });
// }

async function go() {
  await genColorCSSVars();
  // await genGlobal();
}

go();
