module.exports = (config) => {
  config.languages = ['zh-CN', 'en-US'];
  config.template = '__template__/index.[language].md';
  config.outputFileName = 'README.[language].md';
  config.tsParseTool = [
    'ts-document',
    {
      strictComment: true,
      linkFormatter: ({ typeName, jsDocTitle, fullPath }) => {
        const toId = (title) => {
          return title.toLowerCase().replace(/\W/g, '');
        };

        const toHyphen = (str) => {
          return str
            .replace(/^\w/, (g) => g.toLowerCase())
            .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
        };
        if (!jsDocTitle) {
          return `#${toId(typeName)}`;
        }
        const componentName = (fullPath || '').match(/components\/([^/]*)/)?.[1];
        if (componentName) {
          return `${toHyphen(componentName)}#${toId(jsDocTitle)}`;
        }
      },
    },
  ];
};
