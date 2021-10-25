module.exports = (config) => {
  config.languages = ['zh-CN', 'en-US'];
  config.template = '__template__/index.[language].md';
  config.outputFileName = 'README.[language].md';
  config.tsParseTool = ['ts-document'];
};
