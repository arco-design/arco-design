const fs = require('fs-extra');
const babel = require('@babel/core');
const { optimize } = require('svgo');
const nunjucks = require('nunjucks');
const cloneDeep = require('lodash/cloneDeep');
const { svgDataFlat } = require('./getSvgData');

const config = {
  plugins: [
    'removeUnknownsAndDefaults',
    'cleanupAttrs',
    'removeXMLNS',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    // 'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          {
            fill: 'none',
          },
          {
            stroke: 'currentColor',
          },
          '{...props}',
        ],
      },
    },
  ],
};

nunjucks.configure({ autoescape: false });

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-spread',
  ],
};

const babelConfigCjs = cloneDeep(babelConfig);
babelConfigCjs.plugins.push('@babel/plugin-transform-modules-commonjs');

/** 生成入口 js 文件 * */
const syntaxEs = (name) => {
  return `export { default as ${name} } from './react-icon/${name}/index';`;
};

const syntaxCjs = (name) => {
  return `export { default as ${name} } from './react-icon-cjs/${name}/index';`;
};

const entryCode = svgDataFlat.map((com) => syntaxEs(com.componentName)).join('\n');
const entryCodeCjs = svgDataFlat.map((com) => syntaxCjs(com.componentName)).join('\n');

fs.outputFile('../index.es.js', entryCode, (err) => {
  if (err) return;
  console.log('Generate es module entry success!'); // eslint-disable-line
});
fs.outputFile('../index.js', babel.transform(entryCodeCjs, babelConfigCjs).code, (err) => {
  if (err) return;
  console.log('Generate commonjs entry success!'); // eslint-disable-line
});
/** 生成入口 js 文件结束 * */

/** 生成 context 文件 */
const contextJsx = `import { createContext } from 'react';

export var IconContext = createContext({
  prefixCls: 'arco',
});
`;

fs.outputFile('../react-icon/context.js', contextJsx, (err) => {
  if (err) return;
  console.log('Generate context file success!'); // eslint-disable-line
});

fs.outputFile(
  '../react-icon-cjs/context.js',
  babel.transform(contextJsx, babelConfigCjs).code,
  (err) => {
    if (err) return;
    console.log('Generate commonjs context file success!'); // eslint-disable-line
  }
);

const dTs = `import * as React from 'react';
type IconContextType = {
  prefixCls?: string;
}

export declare const IconContext: React.Context<IconContextType>;
`;

fs.outputFile('../react-icon/context.d.ts', dTs, (err) => {
  if (err) return;
  console.log('Generate context ts file success!'); // eslint-disable-line
});

fs.outputFile('../react-icon-cjs/context.d.ts', dTs, (err) => {
  if (err) return;
  console.log('Generate commonjs context ts file success!'); // eslint-disable-line
});
/** 生成 context 文件结束 */

// 生成 SVG React Component
const totalLength = svgDataFlat.length;
let length = 0;
function generateIcon(cjs) {
  for (let i = 0; i < svgDataFlat.length; i++) {
    const iconClassName = svgDataFlat[i].name;
    const iconName = svgDataFlat[i].componentName;
    const iconPath = svgDataFlat[i].file;
    const svgCode = fs.readFileSync(svgDataFlat[i].file, 'utf8');

    const svg = optimize(svgCode, { path: iconPath, ...config })
      .data.replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/class=/g, 'className=');

    nunjucks.render(
      './icon.template.nunjucks',
      {
        svg,
        iconName,
        iconClassName,
      },
      (err, res) => {
        if (err) return;
        const code = babel.transform(res, cjs ? babelConfigCjs : babelConfig).code;
        fs.outputFile(
          `../${cjs ? 'react-icon-cjs' : 'react-icon'}/${iconName}/index.js`,
          code,
          (err) => {
            if (!err) {
              length += 1;
              if (length === totalLength) {
                console.log(`\nGenerate icon success! Total: ${totalLength}\n`); // eslint-disable-line
              }
            }
          }
        );
      }
    );
  }
}

let typingsCode = `import * as React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  style?: React.CSSProperties;
  spin?: boolean;
}

`;

svgDataFlat
  .map((svg) => svg.componentName)
  .forEach(
    (componentName) =>
      (typingsCode += `export declare const ${componentName}: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<unknown>>\n`)
  );

fs.outputFileSync('../index.d.ts', typingsCode);

generateIcon();
generateIcon(true);
