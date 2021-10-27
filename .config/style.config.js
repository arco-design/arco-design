module.exports = function StyleConfig(config) {
  config.less.cssJsEntry = ['components/**/style/index.ts'];
  config.less.output.dist.cssFileName = 'arco.min.css';
  config.less.watch = [
    'components/**/*.{less,woff,woff2,png,jpg}',
    'components/style/theme/color/*.js',
  ];
  config.less.watchBase = {
    ['components/**/*.{less,woff,woff2,png,jpg}']: 'components',
    ['components/style/theme/color/*.js']: 'components',
  };
  config.jsEntry.autoInjectArcoDep = false;
};
