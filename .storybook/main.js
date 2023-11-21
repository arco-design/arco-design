const path = require('path');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getLoaderForStyle(isCssModule) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: isCssModule ? { modules: true } : {},
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ];
}

module.exports = {
  stories: ['../stories/**/*.story.tsx', '../stories/**/*.story.jsx'],
  webpackFinal: (config) => {
    const dirIcon = path.resolve(__dirname, '../icon');
    const dirHooks = path.resolve(__dirname, '../hooks');
    const dirComponent = path.resolve(__dirname, '../es');

    config.resolve.alias['@self/icon'] = dirIcon;
    config.resolve.alias['@self/hooks'] = dirHooks;
    config.resolve.alias['@self'] = dirComponent;
    config.resolve.alias['@arco-design/web-react/icon'] = dirIcon;
    config.resolve.alias['@arco-design/web-react'] = dirComponent;
    config.resolve.extensions.push('.tsx');

    config.resolve.modules = ['node_modules', path.resolve(__dirname, '../site/node_modules')];
    // 解决 webpack 编译警告
    config.module.rules[0].use[0].options.plugins.push([
      '@babel/plugin-proposal-private-property-in-object',
      { loose: true },
    ]);

    // 支持 import less
    config.module.rules.push({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLoaderForStyle(),
    });

    // less css modules
    config.module.rules.push({
      test: lessModuleRegex,
      use: getLoaderForStyle(true),
    });

    // 支持 import svg
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: ['@svgr/webpack'],
    });

    return config;
  },
};
