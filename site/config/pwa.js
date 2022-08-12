const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

exports.getPWAConfig = (config, env) => {
  const isProd = env === 'prod';

  if (isProd) {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, '../src/serviceWorker.js'),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      })
    );
  }
};
