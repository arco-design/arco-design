const fs = require('fs');
const path = require('path');

const hookDirname = '_hooks';
const hookDir = path.resolve(__dirname, `../../components/${hookDirname}`);

const hooks = fs.readdirSync(hookDir);

const genFiles = (mode) => {
  const dirPath = path.resolve(__dirname, `../src-${mode}`);

  fs.writeFileSync(`${dirPath}/index.ts`, ``);

  hooks.map((hook) => {
    fs.mkdirSync(`${dirPath}/${hook}`, { recursive: true });
    fs.writeFileSync(
      `${dirPath}/${hook}/index.ts`,
      `
import ${hook} from '../../../${mode}/${hookDirname}/${hook}';

export default ${hook};

`
    );

    fs.appendFileSync(
      `${dirPath}/index.ts`,
      `
export { default as ${hook} } from './${hook}';

`
    );
  });
};

genFiles('es');
genFiles('lib');
