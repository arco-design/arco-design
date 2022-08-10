// 自定义 webpack 构建配置
const path = require('path');
const webpack = require('webpack');
const { version } = require('../package.json');

// 组件 dist 打包
exports.component = (config) => {
  config.entry = path.resolve(__dirname, '../components/index.tsx');
  config.plugins.pop();
  config.plugins.push(
    new webpack.BannerPlugin({
      banner: `ArcoDesign v${version}\n\nCopyright 2019-present, Bytedance, Inc.\nAll rights reserved.\n`,
    })
  );
};

// 图标 dist 打包
exports.icon = (config) => {
  config.plugins.pop();
  config.plugins.push(
    new webpack.BannerPlugin({
      banner: `ArcoDesign v${version}\n\nCopyright 2019-present, Bytedance, Inc.\nAll rights reserved.\n`,
    })
  );
  config.resolve.modules = ['node_modules', path.resolve(__dirname, '../site/main/node_modules')];
};
